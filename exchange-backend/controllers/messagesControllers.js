// controllers/messagesControllers.js
const Message = require('../models/message');

// Create a new message in a negotiation
exports.createMessage = async(req, res) => {
    try {
        const { negotiationId } = req.params;
        const { senderId, content } = req.body;

        const newMessage = new Message({
            negotiationId,
            senderId,
            content,
            timestamp: new Date(),
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message created successfully!' });
    } catch (error) {
        console.error('Error creating message:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all messages for a negotiation
exports.getAllMessages = async(req, res) => {
    try {
        const { negotiationId } = req.params;
        const messages = await Message.find({ negotiationId });
        res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};