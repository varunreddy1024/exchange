const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
    buyerItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    sellerItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: function() {
            return ['exchange', 'exchangeAndMoney'].includes(this.sellingType);
        },
    },
    proposal: {
        type: String,
        required: true,
    },
    sellingType: {
        type: String,
        enum: ['exchange', 'exchangeAndMoney', 'completeMoney'],
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    money: {
        type: Number,
        // Required only if sellingType is 'exchangeAndMoney' or 'completeMoney'
        required: function() {
            return ['exchangeAndMoney', 'completeMoney'].includes(this.sellingType);
        },
    },
}, { timestamps: true });

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

module.exports = Negotiation;