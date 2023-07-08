const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
    },
    staffId: {
      type: String,
      required: true,
    },
    companyRole: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("staff", staffSchema);
