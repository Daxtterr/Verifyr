const express = require("express");
const companiesControllers = require("../controllers/companies.controller");
const authMiddleware = require("../middlewares/auth");
const inputValidators = require("../middlewares/inputValidator");

const router = express.Router();

router.post(
  "/createcompanyaccount",
  inputValidators.createCompanyValidator,
  companiesControllers.createCompanyController
);
router.post(
  "/createadmin",
  authMiddleware.authenticate,
  inputValidators.createStaffValidator,
  companiesControllers.createAdminController
);
router.post(
  "/adminlogin",
  inputValidators.adminLoginValidator,
  companiesControllers.AdminLoginController
);
router.post(
  "/createstaff",
  authMiddleware.authenticate,
  inputValidators.createStaffValidator,
  companiesControllers.createStaffController
);
router.get("/allcompanies", companiesControllers.getAllCompaniesController);
router.post("/forgot-password", companiesControllers.forgotPasswordController);
router.get("/staff", companiesControllers.findStaffController);
router.post("/reset-password", companiesControllers.resetPasswordController);
router.post(
  "/allstaff",
  authMiddleware.authenticate,
  companiesControllers.getAllStaffController
);

module.exports = router;
