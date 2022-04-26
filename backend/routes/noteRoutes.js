const express = require('express');
const router = express.Router({ mergeParams: true }); // this part is different from other routes
const { getNotes } = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

// The route we want to get is: /api/tickets/:ticketId/notes
router.route('/').get(protect, getNotes);

module.exports = router;
