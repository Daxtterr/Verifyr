const companyService = require("../services/companies.service");

const createCompanyController = async (req, res) => {
  try {
    const response = await companyService.createCompanyService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account",
      status: "failure",
    });
  }
};

const createAdminController = async (req, res) => {
  try {
    const response = await companyService.createAdminAccountService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create admin",
      status: "failure",
    });
  }
};

const AdminLoginController = async (req, res) => {
  try {
    const response = await companyService.AdminLoginService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to login",
      status: "failure",
    });
  }
};

const createStaffController = async (req, res) => {
  try {
    const response = await companyService.createStaffAccountService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      essage: "Unable to create staff",
      status: "failure",
    });
  }
};

const getAllCompaniesController = async (req, res) => {
  const response = await companyService.getAllCompaniesService();
  res.status(response.statusCode).json(response);
};

module.exports = {
  createCompanyController,
  createAdminController,
  createStaffController,
  AdminLoginController,
  getAllCompaniesController,
};
