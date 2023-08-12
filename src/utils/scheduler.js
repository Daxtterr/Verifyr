const nodeCron = require("node-cron");
const sendMail = require("../utils/sendMail");

const job = nodeCron.schedule("0 0 * * * *", () => {
  const messagePayload = {
    to: "muhammadhajara040@gmail.com",
    subject: "WAKE UP 😏",
  };
  sendMail.sendScheduledMail(messagePayload);
});

module.exports = job;
