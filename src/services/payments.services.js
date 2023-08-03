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
    const paymentLink = response.data;
    await Transaction.create({ ...body, amount: body.amount / 100 });
    return responses.buildSuccessResponse(
      "Transaction initialized",
      200,
      paymentLink
    );
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse(error?.message, error?.statusCode);
  }
};

const paystackWebhookService = async (payload) => {
  try {
    const foundUser = await Transaction.findOne({
      reference: payload.data.reference,
    });

    const updateObject = {
      ipAddress: payload.data.ip_address,
      currency: payload.data.currency,
      channel: payload.data.channel,
      transactionId: payload.data.id,
      status: payload.data.status,
      paidAt: payload.data.paid_at,
    };
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id: foundUser._id },
      updateObject,
      { new: true }
    );
    return responses.buildSuccessResponse("Transaction Noted", 200);
  } catch (error) {
    return responses.buildFailureResponse(
      "Unable to get payment information",
      200
    );
  }
};

module.exports = {
  initiatePaymentService,
  paystackWebhookService,
};
