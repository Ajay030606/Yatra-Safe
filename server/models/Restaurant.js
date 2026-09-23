const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  cuisine: [String],
  priceRange: { type: String, enum: ['Low', 'Medium', 'High'] },
  rating: { type: Number, default: 3 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
