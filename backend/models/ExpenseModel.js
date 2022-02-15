const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    type: {
      type: String,
      required: [true, "Please enter an expense type"],
    },
    expense_price: {
      type: String,
      required: [true, "Please enter the monthly expense cost"],
    },
    due_date: {
      type: String,
      required: [true, "Please enter the day of the month its due"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
