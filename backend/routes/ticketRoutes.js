const express = require('express');
const router = express.Router();
const { getTickets, createTicket } = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// If you don't want to chain this, you can follow the example in the userRoutes.js
router.route('/').get(protect, getTickets).post(protect, createTicket);

module.exports = router;
