
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true
        },

        customerEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);