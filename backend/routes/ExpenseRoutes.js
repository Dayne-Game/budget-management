const express = require("express");
const router = express.Router();

const { getExpenses, createExpense, deleteExpense, updateExpense } = require("../controllers/ExpenseController");

const { protect } = require("../middleware/AuthMiddleware");

router.route("/").get(protect, getExpenses).post(protect, createExpense);

router.route("/:id").delete(protect, deleteExpense).put(protect, updateExpense);

module.exports = router;
