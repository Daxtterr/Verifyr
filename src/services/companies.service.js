const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("../models/company.model");
const Staff = require("../models/staff.model");
const responses = require("../utils/response");
const { all } = require("../routes/payment.routes");

const createCompanyService = async (payload) => {
  const { name, contactEmail, regNo } = payload;

  const foundUser = await Company.findOne({ name: name });
  if (foundUser) {
    return responses.buildFailureResponse(
      "Company name already registered",
      400
    );
  }

  const foundRegNo = await Company.findOne({ regNo: regNo });
  if (foundRegNo) {
    return responses.buildFailureResponse(
      "Company's registration number already exists",
      400
    );
  }

  const foundEmail = await Company.findOne({ contactEmail: contactEmail });
  if (foundEmail) {
    return responses.buildFailureResponse(
      "Company's email number already exists",
      400
    );
  }

  const newCompany = await Company.create(payload);
  return responses.buildSuccessResponse(
    "Company created Successfully",
    200,
    newCompany
  );
};

const createAdminAccountService = async (payload) => {
  const { contactNo, contactEmail } = payload;

  const foundcontactNo = await Staff.findOne({ contactNo: contactNo });
  if (foundcontactNo) {
    return {
      message: "Phone number already in use",
      status: "failure",
      statusCode: 400,
    };
  }

  const foundEmail = await Staff.findOne({ contactEmail: contactEmail });
  if (foundEmail) {
    return {
      message: "Staff email already in use",
      status: "failure",
      statusCode: 400,
    };
  }

  const saltRounds = 10; //typically stored in dotenv
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
  payload.password = hashedPassword;
  payload.role = "admin";

  const newAdmin = await Staff.create(payload);
  return {
    message: "Account created successfully",
    statusCode: 201,
    status: "success",
    data: newAdmin,
  };

  // const foundEmailOrPhone = await Staff.findOne({
  //   $or: [{ email: payload.email }, { email: payload.phone }],
  // });

  // if (foundEmailOrPhone) {
  //   return {
  //     message: "Staff phone or email duplicated",
  //     statusCode: 400,
  //     status: "failure",
  //   };
  // }
};

const createStaffAccountService = async (payload) => {
  const { contactEmail, contactNo } = payload;

  const foundContactEmail = await Staff.findOne({ contactEmail: contactEmail });
  if (foundContactEmail) {
    return {
      message: "Email already exists",
      statusCode: 400,
      status: "failure",
    };
  }

  const foundContactNo = await Staff.findOne({ contactNo: contactNo });
  if (foundContactNo) {
    return {
      message: "Phone number already exists",
      statusCode: 400,
      status: "failure",
    };
  }

  const newStaff = await Staff.create(payload);
  return {
    message: "Account created successfully",
    statusCode: 201,
    status: "success",
    data: newStaff,
  };
};

const AdminLoginService = async (payload) => {
  const { contactEmail, password } = payload;

  const foundStaff = await Staff.findOne({ contactEmail: contactEmail }).lean();
  if (!foundStaff) {
    return {
      message: "User not found",
      status: "Failure",
      statusCode: 404,
    };
  }

  if (foundStaff.role !== "admin") {
    return responses.buildFailureResponse("Only Admins Allowed", 403);
  }

  const passwordMatch = await bcrypt.compare(password, foundStaff.password);
  if (!passwordMatch) {
    return {
      message: "Password Incorrect",
      status: "Failure",
      statusCode: 400,
    };
  }

  const token = jwt.sign(
    {
      email: foundStaff.contactEmail,
      firstName: foundStaff.firstName,
      role: foundStaff.companyRole,
      _id: foundStaff._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  foundStaff.accessTokentoken = token;
  return responses.buildSuccessResponse("Login successful", 200, foundStaff);
};

const getAllCompaniesService = async () => {
  const allStaff = await Company.find({});
  if (!allStaff) {
    return responses.buildFailureResponse(
      "Cannot fetch staff at this time",
      404
    );
  }
  const numberOfCompanies = allStaff.length;
  return responses.buildSuccessResponse(
    `Available companies displayed are ${numberOfCompanies}`,
    200,
    allStaff
  );
};

module.exports = {
  createCompanyService,
  AdminLoginService,
  createAdminAccountService,
  createStaffAccountService,
  getAllCompaniesService,
};
