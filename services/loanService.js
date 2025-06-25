const Loan = require("../models/loanModel");
const applyPagination = require("../utils/pagination");

// get all loans
const getAllLoansService = async (query) => {
  const { page = 1, limit = 5 } = query;
  const dbQuery = applyPagination(Loan.find().populate("user").populate("book"), page, limit);
  const loans = await dbQuery;
  const total = await Loan.countDocuments();
  return { loans, total, page, limit };
};

// create loan
const createLoanService = async (userId, data) => {
  return await Loan.create({ ...data, user: userId });
};

// update loan
const updateLoanService = async (id, data) => {
  return await Loan.findByIdAndUpdate(id, data, { new: true });
};

// return loan
const deleteLoanService = async (id) => {
  return await Loan.findByIdAndUpdate(id, { status: "returned" }, { new: true });
};

module.exports = { getAllLoansService, createLoanService, updateLoanService, deleteLoanService };
