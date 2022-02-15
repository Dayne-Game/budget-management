const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter the income name"],
    },
    type: {
      type: String,
      required: [true, "Please select an income type"],
      enum: ["Salary", "Wages", "Commission", "Passive", "Dividend", "Investment"],
    },
    month_income: {
      type: String,
      required: [true, "Please enter income as month"],
    },
    frequency: {
      type: String,
      required: [true, "Please select a pay frequency"],
      enum: ["Weekly", "Fortnightly", "Monthly"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);
