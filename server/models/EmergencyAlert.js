const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  emergencyContact: {
    name: String,
    phone: String
  },
  status: {
    type: String,
    enum: ['Alert Sent', 'Resolved', 'False Alarm'],
    default: 'Alert Sent'
  }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyAlert', emergencyAlertSchema);
