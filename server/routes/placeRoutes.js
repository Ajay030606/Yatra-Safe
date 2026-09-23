const express = require('express');
const router = express.Router();
const { getPlaces, getPlaceById, createPlace, deletePlace } = require('../controllers/placeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPlaces).post(protect, admin, createPlace);
router.route('/:id').get(getPlaceById).delete(protect, admin, deletePlace);

module.exports = router;
