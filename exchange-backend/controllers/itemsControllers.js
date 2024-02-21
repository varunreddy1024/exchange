// controllers/itemsController.js
const Item = require('../models/Item');
const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.createItem = upload.array('images', 5), async(req, res) => {
    try {
        const { name, description, category, userId, sellingType } = req.body;

        // Assuming you have an array of files in req.files
        const images = req.files.map(file => file.buffer);

        const newItem = new Item({
            name,
            description,
            category,
            images,
            userId,
            sellingType,
        });

        await newItem.save();
        res.status(201).json({ message: 'Item posted successfully!', newItem });
    } catch (error) {
        console.error('Error posting item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllItems = async(req, res) => {
    try {
        // Use Mongoose's populate to get the associated user details
        const items = await Item.find().populate('userId', 'username');
        // console.log(items);
        res.json(items);
    } catch (error) {
        console.error('Error getting items:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updateItem = async(req, res) => {
    try {
        const { itemId } = req.params;
        const { name, description, category, images, sellingType } = req.body;

        // Your logic to update the item with itemId
        // Example: const updatedItem = await Item.findByIdAndUpdate(itemId, { name, description, category, images, sellingType }, { new: true });

        res.json({ message: 'Item updated successfully!', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteItem = async(req, res) => {
    try {
        const { itemId } = req.params;

        // Your logic to delete the item with itemId
        // Example: await Item.findByIdAndDelete(itemId);

        res.json({ message: 'Item deleted successfully!' });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getItemsByUserId = async(req, res) => {
    try {
        const { userId } = req.params;
        console.log('Received userId:', userId);

        const buyerItems = await Item.find({ userId: userId });
        console.log('Items found:', buyerItems);

        res.json(buyerItems);
    } catch (error) {
        console.error('Error getting buyer items:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getItemById = async(req, res) => {
    try {
        const { itemId } = req.params;

        // Use Mongoose's findById to get the item details by ID
        const item = await Item.findById(itemId).populate('userId', 'username');

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error getting item by ID:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};