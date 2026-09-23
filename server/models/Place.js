const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String, // e.g., Historical, Nature, Adventure
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
  rating: {
    type: Number,
    default: 4.0
  },
  entryFee: {
    type: Number,
    default: 0
  },
  openingTime: {
    type: String // e.g., "09:00"
  },
  closingTime: {
    type: String // e.g., "18:00"
  },
  visitingDuration: {
    type: Number, // in minutes
    default: 60
  },
  image: {
    type: String
  },
  city: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
