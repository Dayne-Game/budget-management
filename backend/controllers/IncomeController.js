const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Income = require("../models/IncomeModel");

// @desc    Get users income
// @route   GET /api/income
// @access  Private
const getIncome = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const income = await Income.find({ user: req.user.id });

  res.status(200).json(income);
});

// @desc    Create an new Income
// @route   POST /api/income
// @access  Private
const createIncome = asyncHandler(async (req, res) => {
  const { name, type, month_income, frequency } = req.body;

  if (!name || !type || !month_income || !frequency) {
    res.status(400);
    throw new Error("Invalid Expense Details | Check Fields");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const income = await Income.create({
    user: req.user.id,
    name,
    type,
    month_income,
    frequency,
  });

  res.status(201).json(income);
});

// @desc    Delete Income
// @route   DELETE /api/income/:id
// @access  Private
const deleteIncome = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const income = await Income.findById(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income not found");
  }

  if (income.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await income.remove();
  res.status(200).json({ success: true });
});

// @desc    Update Income
// @route   PUT /api/income/:id
// @access  Private
const updateIncome = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const income = await Income.findById(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income not found");
  }

  if (income.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Income not found");
  }

  const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedIncome);
});

module.exports = { getIncome, createIncome, deleteIncome, updateIncome };
