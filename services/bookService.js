const Book = require("../models/bookModel");
const applyPagination = require("../utils/pagination");

// Get all books
const getAllBooksService = async (query) => {
  const { page = 1, limit = 5, title, category } = query;

  const filter = {};
  if (title) filter.title = new RegExp(title, "i");
  if (category) filter.category = new RegExp(category, "i");

  let dbQuery = Book.find(filter).populate("author", "name bio");
  dbQuery = applyPagination(dbQuery, page, limit);

  const books = await dbQuery;
  const total = await Book.countDocuments(filter);

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    books,
  };
};

// Get book by ID
const getBookByIdService = async (id) => {
    try {
        const book = await Book.findById(id);
        if (!book) throw new Error("Book not found");
        return book;
    } catch (error) {
        throw new Error("Error fetching book by ID: " + error.message);
    }
};

// Add a new book
const addBookService = async (bookData) => {
    try {
        const newBook = new Book(bookData);
        return await newBook.save();
    } catch (error) {
        throw new Error("Error adding book: " + error.message);
    }
};  

// Update an existing book
const updateBookService = async (id, bookData) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
        if (!updatedBook) throw new Error("Book not found for update");
        return updatedBook;
    } catch (error) {
        throw new Error("Error updating book: " + error.message);
    }
};

// Delete a book
const deleteBookService = async (id) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) throw new Error("Book not found for deletion");
        return deletedBook;
    } catch (error) {
        throw new Error("Error deleting book: " + error.message);
    }
};

// Upload cover image
const uploadCoverService = async (bookId, filePath) => {
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { coverImage: filePath },
    { new: true }
  );
  return updatedBook;
};

module.exports = {
    uploadCoverService,
    getAllBooksService,
    getBookByIdService,
    addBookService,
    updateBookService,
    deleteBookService,
};
