const express = require("express");
const router = expressRoute();

const { getBank, createBank, deleteBank, updateBank } = require("../controllers/BankController");

const { protect } = require("../middleware/AuthMiddleware");

router.route("/").get(protect, getBank).post(protect, createBank);
router.route("/:id").delete(protect, deleteBank).put(protect, updateBank);

module.exports = router;
