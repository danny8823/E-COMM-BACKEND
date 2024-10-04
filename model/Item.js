const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            default: 'Product description'
        },
        image: {
            type: String,
        },
        category: {
            type: String,
            required: true,
            enum: ['clubs','balls','gloves','bags']
        }
    }
)   

module.exports = mongoose.model("Item", itemSchema)