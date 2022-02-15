const mongoose = require("mongoose");

const bankSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter name of Bank Account"],
    },
    type: {
      type: String,
      required: [true, "Please select an income type"],
      enum: ["Everyday", "Savings", "Salary / Income"],
    },
    balance: {
      type: Number,
      required: [true, "Please enter account balance"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bank", bankSchema);
