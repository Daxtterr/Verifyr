const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/payments.controller");
const authMiddleware = require("../middlewares/auth");

router.post(
  "/initiate",
  authMiddleware.authenticate,
  paymentsController.initiatePaymentController
);

router.post("/webhook", paymentsController.paystackWebhookController);

module.exports = router;
