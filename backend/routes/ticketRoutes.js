const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// If you don't want to chain this, you can follow the example in the userRoutes.js
router.route('/').get(protect, getTicket).post(protect, createTicket);

module.exports = router;
