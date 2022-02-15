const express = require("express");
const router = express.Router();

const { getIncome, createIncome, deleteIncome, updateIncome } = require("../controllers/IncomeController");

const { protect } = require("../middleware/AuthMiddleware");

router.route("/").get(protect, getIncome).post(protect, createIncome);

router.route("/:id").delete(protect, deleteIncome).put(protect, updateIncome);

module.exports = router;
