const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Expense = require("../models/ExpenseModel");

// @desc    Get Expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const expenses = await Expense.find({ user: req.user.id });
  res.status(200).json(expenses);
});

// @desc    Create an new Expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { name, type, expense_price, due_date } = req.body;

  if (!name || !type || !expense_price || !due_date) {
    res.status(400);
    throw new Error("Invalid Expense Details | Check Fields");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const expense = await Expense.create({
    user: req.user.id,
    name,
    type,
    expense_price,
    due_date,
  });

  res.status(201).json(expense);
});

// @desc    Delete Expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await expense.remove();
  res.status(200).json({ success: true });
});

// @desc    Update Expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Expense not found");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedExpense);
});

module.exports = { getExpenses, createExpense, deleteExpense, updateExpense };
