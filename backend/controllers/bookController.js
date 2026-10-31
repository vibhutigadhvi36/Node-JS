
const Book = require("../models/Book");

const getBooks = async (req, res) => {

    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const createBook = async (req, res) => {
    try {
        const {
    title,
    author,
    isbn,
    category,
    price,
    totalCopies,
    availableCopies
} = req.body;

        const book = await Book.create({
            title,
            author,
            isbn,
            category,
            price,
            totalCopies,
            availableCopies
        });
        
        res.status(201).json({
            message: "Book added successfully",
            book
        });
    } catch (error) {
        const status = error.code === 11000 ? 409 : 400;

        res.status(status).json({
            message: error.code === 11000
                ? "A book with this ISBN already exists"
                : error.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};