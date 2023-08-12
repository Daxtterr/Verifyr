const express = require("express");
const companiesControllers = require("../controllers/companies.controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/createcompanyaccount",
  companiesControllers.createCompanyController
);
router.post("/createadmin", companiesControllers.createAdminController);
router.post("/adminlogin", companiesControllers.AdminLoginController);
router.post(
  "/createstaff",
  authMiddleware.authenticate,
  companiesControllers.createStaffController
);
router.get("/allcompanies", companiesControllers.getAllCompaniesController);
router.post("/forgot-password", companiesControllers.forgotPasswordController);
router.get("/staff", companiesControllers.findStaffController);
router.post("/reset-password", companiesControllers.resetPasswordController);

module.exports = router;
