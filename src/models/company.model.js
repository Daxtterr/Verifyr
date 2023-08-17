const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "Inactive"],
    default: "active",
  },
});

module.exports = mongoose.model("company", companySchema);
