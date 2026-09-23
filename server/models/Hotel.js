const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 3 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  amenities: [String],
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
