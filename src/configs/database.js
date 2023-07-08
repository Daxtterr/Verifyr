const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");
//   console.log("Im running")
// }

const connectDB = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
