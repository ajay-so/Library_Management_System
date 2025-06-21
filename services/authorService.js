const Author = require("../models/authorModel");
const Book = require("../models/bookModel");
const applyPagination = require("../utils/pagination");

//get all authors
const getAllAuthorsService = async (query = {}) => {
  try {
    const { page = 1, limit = 5, name } = query;

    let filter = {};
    if (name) filter.name = new RegExp(name, "i"); // case-insensitive match

    let dbQuery = Author.find(filter);
    dbQuery = applyPagination(dbQuery, page, limit);

    const authors = await dbQuery;
    const total = await Author.countDocuments(filter);

    return {
      total,
      page: Number(page),
      limit: Number(limit),
      authors,
    };
  } catch (error) {
    throw new Error("Error fetching authors: " + error.message);
  }
};


//get author by id 
const getAuthorByIdService = async (id) => {
    try {
        const author = await Author.findById(id);
        if (!author) throw new Error("Author not found");
        return author;
    } catch (error) {
        throw new Error("Error fetching author by ID: " + error.message);
    }
};

//add new author
const addAuthorService = async (authorData) => {
    try {
        const newAuthor = new Author(authorData);
        return await newAuthor.save();
    } catch (error) {
        throw new Error("Error adding author: " + error.message);
    }
};

//update author details
const updateAuthorService = async (id, authorData) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, authorData, { new: true });
        if (!updatedAuthor) throw new Error("Author not found for update");
        return updatedAuthor;
    } catch (error) {
        throw new Error("Error updating author: " + error.message);
    }
};

//delete author
const deleteAuthorService = async (authorId) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (!deletedAuthor) throw new Error("Author not found for deletion");

    await Book.deleteMany({ author: authorId });

    return deletedAuthor;
  } catch (error) {
    throw new Error("Error deleting author: " + error.message);
  }
};

module.exports = {
    getAllAuthorsService,
    getAuthorByIdService,
    addAuthorService,
    updateAuthorService,
    deleteAuthorService,
};