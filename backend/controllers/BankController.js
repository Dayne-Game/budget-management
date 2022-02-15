const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Bank = require("../models/BankModel");

// @desc    Get bank
// @route   GET /api/bank
// @access  Private
const getBank = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const bank = await Bank.find({ user: req.user.id });

  res.status(200).json(bank);
});

// @desc    Create new bank
// @route   POST /api/bank
// @access  Private
const createBank = asyncHandler(async (req, res) => {
  const { name, type, balance } = req.body;

  if (!name || !balance || !type) {
    res.status(400);
    throw new Error("Please add a name and balance");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const bank = await Bank.create({
    name,
    type,
    balance,
    user: req.user.id,
  });

  res.status(201).json(bank);
});

// @desc    Delete bank
// @route   DELETE /api/bank/:id
// @access  Private
const deleteBank = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const bank = await Bank.findById(req.params.id);

  if (!bank) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (bank.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await bank.remove();

  res.status(200).json({ success: true });
});

// @desc    Update bank
// @route   PUT /api/bank/:id
// @access  Private
const updateBank = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const bank = await Bank.findById(req.params.id);

  if (!bank) {
    res.status(404);
    throw new Error("Bank not found");
  }

  if (bank.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedBank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedBank);
});

module.exports = {
  getBank,
  createBank,
  deleteBank,
  updateBank,
};
