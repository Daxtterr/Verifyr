const Joi = require("joi");

const createCompanyValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    regNo: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    website: Joi.string().required(),
    contactPhone: Joi.string().required(),
    logo: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const createStaffValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string(),
    contactNo: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    staffId: Joi.string().required(),
    companyRole: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    company: Joi.string().hex().length(24),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const adminLoginValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    contactEmail: Joi.string().email().required(),
    password: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};
module.exports = {
  createStaffValidator,
  adminLoginValidator,
  createCompanyValidator,
};
