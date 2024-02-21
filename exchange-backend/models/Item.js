const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        enum: ['mobiles', 'watches', 'laptops', 'shoes', 'clothes', 'others'],
        required: true,
    },
    image: { type: Buffer, required: true },
    sellingType: {
        type: String,
        enum: ['exchange', 'exchangeAndMoney', 'completeMoney'],
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Item = model('Item', itemSchema);

module.exports = Item;