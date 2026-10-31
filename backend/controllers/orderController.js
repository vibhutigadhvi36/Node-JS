
const Order = require("../models/Order");
const Book = require("../models/Book");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("book");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            bookId,
            quantity
        } = req.body;

        if (!customerName || !customerEmail || !bookId ||
            !Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Please provide valid customer details, book ID and quantity"
            });
        }

        const existingBook = await Book.findById(bookId);

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Check and reduce available stock
        const book = await Book.findOneAndUpdate(
            {
                _id: bookId,
                availableCopies: { $gte: quantity }
            },
            {
                $inc: { availableCopies: -quantity }
            },
            {
                new: true
            }
        );

        if (!book) {
            return res.status(400).json({
                message: "Not enough books available in stock"
            });
        }

        try {
            const order = await Order.create({
                customerName,
                customerEmail,
                book: book._id,
                quantity,
                totalAmount: book.price * quantity
            });

            res.status(201).json({
                message: "Order placed successfully",
                order
            });
        } catch (error) {
            await Book.findByIdAndUpdate(bookId, {
                $inc: { availableCopies: quantity }
            });

            throw error;
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    createOrder
};
