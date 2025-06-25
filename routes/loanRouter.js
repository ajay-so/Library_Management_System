const express = require("express");
const router = express.Router();
const { getAllLoans, createLoan, updateLoan, deleteLoan } = require("../controllers/loanController");
const verifyToken = require("../middleware/userAuth");

// Book-protected routes
router.get("/", getAllLoans);
router.post("/", verifyToken, createLoan);
router.put("/:id", verifyToken, updateLoan);
router.delete("/:id", verifyToken, deleteLoan);

module.exports = router;
