const express = require("express");
const router = express.Router();

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
router.post("/",addAuthor);

//update a author
router.put("/:id", updateAuthor);

//delete a author
router.delete("/:id", deleteAuthor);

module.exports = router;