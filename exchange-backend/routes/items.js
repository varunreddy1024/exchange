// routes/items.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsControllers');

router.post('/items', itemsController.createItem);

router.get('/items', itemsController.getAllItems);

router.get('/items/:userId', itemsController.getItemsByUserId);

router.get('/items/details/:itemId', itemsController.getItemById);


module.exports = router;