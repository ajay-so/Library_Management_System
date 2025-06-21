const { getAllAuthorsService, getAuthorByIdService, addAuthorService, updateAuthorService, deleteAuthorService } = require("../services/authorService");

const getAllAuthors = async (req, res) => {
    try {
        const data = await getAllAuthorsService(req.query);
        res.status(200).json({ message: "Authors fetched successfully", data});
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch authors", error: error.message });
    }
};  

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await getAuthorByIdService(id);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json({ message: "Author fetched successfully", author});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch author", error: err.message });
    }
}

const addAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const newAuthor = await addAuthorService(authorData);
        res.status(201).json({ message: "Author added successfully", newAuthor});
    } catch (err) {
        res.status(500).json({ message: "Failed to add author", error: err.message });
    }
}

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const authorData = req.body;
        const updatedAuthor = await updateAuthorService(id, authorData);
        if (!updatedAuthor) {
            return res.status(404).json({ message: "Author not found for update" });
        }
        res.status(200).json({ message: "Author updated successfully", updatedAuthor});
    } catch (err) {
        res.status(500).json({ message: "Failed to update author", error: err.message });
    }
}

//delete a author
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuthor = await deleteAuthorService(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Author not found for deletion" });
        }
        res.status(200).json({ message: "Author deleted successfully", deletedAuthor});
    } catch (err) {
        res.status(500).json({ message: "Failed to delete author", error: err.message });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
};

