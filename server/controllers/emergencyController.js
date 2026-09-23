const EmergencyAlert = require('../models/EmergencyAlert');
const User = require('../models/User');

const createAlert = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    
    // In a real app, we would use Twilio or a similar service to send an SMS here
    const user = await User.findById(req.user._id);

    const alert = await EmergencyAlert.create({
      user: req.user._id,
      latitude,
      longitude,
      emergencyContact: {
        name: user.emergencyContactName,
        phone: user.emergencyContactPhone
      }
    });
    
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAlerts = async (req, res) => {
    try {
      const alerts = await EmergencyAlert.find().populate('user', 'name phone').sort({ timestamp: -1 });
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { createAlert, getHistory, getAllAlerts };
