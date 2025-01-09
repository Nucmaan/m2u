const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
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
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listings",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    paymentDate: {
      type: Date,
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true, 
  }
);

const Bill = mongoose.models.Bill || mongoose.model("Bill", BillSchema);

module.exports = Bill;


