const axios = require("axios");
const Transaction = require("../models/transaction.model");
const responses = require("../utils/response");
const generateReference = require("../utils/generatePaymentReference");

const initiatePaymentService = async (user) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    };
    const body = {
      amount: Number(process.env.AMOUNT) * 100,
      email: user.contactEmail,
      reference: generateReference(),
    };
    const response = await axios.post(process.env.PAYSTACK_URL, body, options);
   const paymentLink = response.data
    await Transaction.create(body);
    return responses.buildSuccessResponse("Transaction initialized", 200,paymentLink);
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse(error?.message, error?.statusCode);
  }
};

module.exports = {
  initiatePaymentService,
};
