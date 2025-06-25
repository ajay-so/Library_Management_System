const {
  getAllLoansService,
  createLoanService,
  updateLoanService,
  deleteLoanService,
} = require("../services/loanService");

const getAllLoans = async (req, res) => {
  try {
    const result = await getAllLoansService(req.query);
    res.status(200).json({ message: "Loans fetched", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLoan = async (req, res) => {
  try {
    const result = await createLoanService(req.user._id, req.body);
    res.status(201).json({ message: "Loan created", loan: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const result = await updateLoanService(req.params.id, req.body);
    res.status(200).json({ message: "Loan updated", loan: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLoan = async (req, res) => {
  try {
    const result = await deleteLoanService(req.params.id);
    res.status(200).json({ message: "Loan returned", loan: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllLoans, createLoan, updateLoan, deleteLoan };
