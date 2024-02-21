// routes/messages.js
const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesControllers');

// POST: Create a new message in a negotiation
router.post('/messages/:negotiationId', messagesController.createMessage);

// GET: Get all messages for a negotiation
router.get('/messages/:negotiationId', messagesController.getAllMessages);

module.exports = router;