const express = require('express');
const router = express.Router();
const { generateItinerary, getItineraries, getItineraryById } = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getItineraries);
router.route('/generate').post(protect, generateItinerary);
router.route('/:id').get(protect, getItineraryById);

module.exports = router;
