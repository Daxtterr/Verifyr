const jwt = require("jsonwebtoken");
const Staff = require("../models/staff.model");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization header must start with 'Bearer'",
        status: "failure",
      });
    }
    const token = authorization.substring(7);
    const decodedUser = jwt.decode(token);
    const foundStaff = await Staff.findOne({ _id: decodedUser._id });
    if (foundStaff.role !== "admin") {
      return res.status(400).json({
        message: "Only admins allowed",
        status: "failure",
      });
    }
    req.user = foundStaff;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "unable to authenticate");
  }
};

module.exports = {
  authenticate,
};
