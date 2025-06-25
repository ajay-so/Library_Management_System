const {
    getAllBooksService,
    getBookByIdService,
    addBookService,
    updateBookService,
    deleteBookService,
    uploadCoverService
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
        const author = req.user._id;
        const { title, category, publishedYear, price, description } = req.body;
        if (!title || !category || !publishedYear || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBook = await addBookService({ title, author, category, publishedYear, price, description });
        res.status(201).json({ message: "Book added successfully", newBook });
    } catch (err) {
        res.status(500).json({ message: "Failed to add book", error: err.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const author = req.user._id;
        const { id } = req.params;
        const { title, category, publishedYear, price, description } = req.body;
        if ( !author || !category || !publishedYear || !price || !description) {
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

const uploadBookCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bookId = req.params.id;
    const updatedBook = await uploadCoverService(bookId, req.file.path.replace(/\\/g, "/"));

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Cover image uploaded successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


module.exports = {
    uploadBookCover,
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
