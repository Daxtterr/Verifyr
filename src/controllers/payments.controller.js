const paymentServices = require("../services/payments.services");

const initiatePaymentController = async (req, res) => {
  try {
    const response = await paymentServices.initiatePaymentService(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to make payment",
      status: "failure",
    });
  }
};

const paystackWebhookController = async (req,res) => {
  try {
    const response = await paymentServices.paystackWebhookService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(5000).json({
      message:"Unable to resolve",
      status:"failure"
    });
  }
};

module.exports = {
  initiatePaymentController,
  paystackWebhookController
};
