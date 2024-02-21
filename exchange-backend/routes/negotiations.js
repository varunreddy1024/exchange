const express = require('express');
const router = express.Router();
const negotiationController = require('../controllers/negotiationsControllers');

router.post('/negotiations', negotiationController.createNegotiation);
router.get('/negotiations', negotiationController.getAllNegotiations);
router.delete('/negotiations/:negotiationId', negotiationController.deleteNegotiation);

router.get('/negotiations/sent/:userId', negotiationController.getSentNegotiations);
router.get('/negotiations/received/:userId', negotiationController.getReceivedNegotiations);

module.exports = router;