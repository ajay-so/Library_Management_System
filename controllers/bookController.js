const {
    getAllBooksService,
    getBookByIdService,
    addBookService,
    updateBookService,
    deleteBookService,
} = require("../services/bookService");

const getAllBooks = async (req, res) => {
  try {
    const data = await getAllBooksService(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookByIdService(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch book", error: err.message });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, category, publishedYear, price, description } = req.body;
        if (!title || !author || !category || !publishedYear || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBook = await addBookService({ title, author, category, publishedYear, price, description });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ message: "Failed to add book", error: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, category, publishedYear, price, description } = req.body;
        if (!title || !author || !category || !publishedYear || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedBook = await updateBookService(id, { title, author, category, publishedYear, price, description });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully", updatedBook: updatedBook });
    } catch (err) {
        res.status(500).json({ message: "Failed to update book", error: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await deleteBookService(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete book", error: err.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
