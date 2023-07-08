const express = require("express");
const router = express.Router();
const paymentsControl = require("../controllers/payments.controller");

router.post("/pay", paymentsControl.paymentController);

module.exports = router;
