const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/userAuth");
const checkAdmin = require("../middleware/checkAdmin");

const {
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    addAuthor
} = require("../controllers/authorController");

//get all authors
router.get("/", getAllAuthors);

//get a author by id
router.get("/:id", getAuthorById);

//add a new author
router.post("/",verifyToken, checkAdmin, addAuthor);

//update a author
router.put("/:id",verifyToken, checkAdmin, updateAuthor);

//delete a author
router.delete("/:id",verifyToken, checkAdmin, deleteAuthor);

module.exports = router;