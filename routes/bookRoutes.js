const express = require("express");
const router = express.Router();

const {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

//get all books
router.get("/", getAllBooks);

//get a book by id
router.get("/:id", getBookById);

//add a new book
router.post("/", addBook);

//update a book
router.put("/:id", updateBook);

//delete a book
router.delete("/:id", deleteBook);

module.exports = router;