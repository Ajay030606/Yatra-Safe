const express = require('express');
const router = express.Router();
const { createAlert, getHistory, getAllAlerts } = require('../controllers/emergencyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAlert).get(protect, admin, getAllAlerts);
router.route('/history').get(protect, getHistory);

module.exports = router;
