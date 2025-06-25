const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadBookCover");
const verifyToken = require("../middleware/userAuth");
const checkAuthor = require("../middleware/checkAuthor");

const {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    uploadBookCover
} = require("../controllers/bookController");

// Public access
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Author-protected routes
router.post("/", verifyToken, checkAuthor, addBook);
router.put("/:id", verifyToken, checkAuthor, updateBook);
router.delete("/:id", verifyToken, checkAuthor, deleteBook);

// Upload book cover (protected)
router.patch(
  "/:id/upload-cover",
  verifyToken,
  checkAuthor,
  upload.single("cover"),
  uploadBookCover
);

module.exports = router;