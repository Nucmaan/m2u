const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", 
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listings",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Expired", "Terminated"],
      default: "Pending",
    },
    termsAndConditions: {
      type: String,
      trim: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Contract = mongoose.models.Contract || mongoose.model("Contract", contractSchema);

export default Contract;
