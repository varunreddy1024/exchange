const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    negotiationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Negotiation', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;