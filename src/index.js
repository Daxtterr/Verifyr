const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const paymentRouter = require("./routes/payment.routes");
const companyRouter = require("./routes/companies.routes");
const seedAdmin = require("./seeding/index");
//const job = require("./utils/scheduler")
const connectDB = require("./configs/database");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB(process.env.MONGO_URI);
seedAdmin();
//job.start()

app.use(express.json());
app.use(limiter);
app.use("/pay", paymentRouter);
app.use("/company", companyRouter);

app.get("/", async (req, res) => {
  res.send("I am running fast");
});

app.listen(PORT, () => {
  console.log(`Server is running with speed at port ${PORT}`);
});
