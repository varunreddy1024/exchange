const Negotiation = require('../models/negotiation');
exports.createNegotiation = async(req, res) => {
    try {
        const { buyerId, sellerId, buyerItemId, sellerItemId, proposal, sellingType, money } = req.body;

        const newNegotiation = new Negotiation({
            buyerId,
            sellerId,
            buyerItemId,
            sellerItemId,
            proposal,
            sellingType,
            money,
        });

        await newNegotiation.save();
        res.status(201).json({ message: 'Negotiation created successfully!' });
    } catch (error) {
        console.error('Error creating negotiation:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllNegotiations = async(req, res) => {
    try {
        const negotiations = await Negotiation.find();
        res.json(negotiations);
    } catch (error) {
        console.error('Error getting negotiations:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSentNegotiations = async(req, res) => {
    try {
        const { userId } = req.params;

        // Fetch negotiations where the buyer's userId matches the provided userId
        const sentNegotiations = await Negotiation.find({ buyerId: userId });

        res.json(sentNegotiations);
    } catch (error) {
        console.error('Error getting sent negotiations:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getReceivedNegotiations = async(req, res) => {
    try {
        const { userId } = req.params;

        // Fetch negotiations where the seller's userId matches the provided userId
        const receivedNegotiations = await Negotiation.find({ sellerId: userId });

        res.json(receivedNegotiations);
    } catch (error) {
        console.error('Error getting received negotiations:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteNegotiation = async(req, res) => {
    try {
        const { negotiationId } = req.params;

        await Negotiation.findByIdAndDelete(negotiationId);

        res.json({ message: 'negotiation deleted successfully!' });
    } catch (error) {
        console.error('Error deleting negotiation:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};