const mongoose = require('mongoose');

const itineraryActivitySchema = new mongoose.Schema({
  startTime: String, // e.g., "09:00"
  endTime: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
  customActivityName: String, // If not a Place reference (like "Lunch")
  estimatedDuration: Number, // in minutes
});

const itineraryDaySchema = new mongoose.Schema({
  dayNumber: Number,
  date: Date,
  activities: [itineraryActivitySchema]
});

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  days: [itineraryDaySchema]
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);
