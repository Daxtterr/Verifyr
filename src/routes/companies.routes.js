const express = require("express");
const companiesControllers = require("../controllers/companies.controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/createcompanyaccount",
  companiesControllers.createCompanyController
);
router.post(
  "/createadmin",
  authMiddleware.authenticate,
  companiesControllers.createAdminController
);
router.post("/adminlogin", companiesControllers.AdminLoginController);
router.post(
  "/createstaff",
  authMiddleware.authenticate,
  companiesControllers.createStaffController
);
router.get("/allcompanies", companiesControllers.getAllCompaniesController);

module.exports = router;
