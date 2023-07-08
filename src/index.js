const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const paymentRouter = require("./routes/payment.routes");
const companyRouter = require("./routes/companies.routes");
const connectDB = require("./configs/database");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB(process.env.mongo_uri);

app.use(express.json());
app.use(limiter);
app.use("/pay", paymentRouter);
app.use("/company", companyRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "I am running" });
});

app.listen(PORT, () => {
  console.log(`Server is running with speed at port ${PORT}`);
});
