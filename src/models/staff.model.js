const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    contactNo: {
      type: String,
      unique: true,
    },
    contactEmail: {
      type: String,
      unique: true,
    },
    staffId: {
      type: String,
    },
    companyRole: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "company",
    },
    role: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    resetPin: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("staff", staffSchema);
