const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Place = require('../models/Place');
const User = require('../models/User');
const bcrypt = require('bcrypt');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const places = [
  {
    name: 'Gateway of India',
    description: 'Iconic monument overlooking the Arabian Sea.',
    category: 'Historical',
    latitude: 18.9220,
    longitude: 72.8347,
    rating: 4.7,
    visitingDuration: 60,
    city: 'Mumbai',
    image: 'gateway.jpg'
  },
  {
    name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
    description: 'Premier art and history museum in India.',
    category: 'Museums',
    latitude: 18.9269,
    longitude: 72.8327,
    rating: 4.6,
    visitingDuration: 120,
    city: 'Mumbai',
    image: 'museum.jpg'
  },
  {
    name: 'Marine Drive',
    description: 'Picturesque promenade along the coast.',
    category: 'Nature',
    latitude: 18.9440,
    longitude: 72.8227,
    rating: 4.8,
    visitingDuration: 90,
    city: 'Mumbai',
    image: 'marinedrive.jpg'
  },
  {
    name: 'Colaba Causeway',
    description: 'Famous shopping street.',
    category: 'Shopping',
    latitude: 18.9151,
    longitude: 72.8260,
    rating: 4.4,
    visitingDuration: 120,
    city: 'Mumbai',
    image: 'colaba.jpg'
  },
  {
    name: 'Siddhivinayak Temple',
    description: 'Hindu temple dedicated to Lord Shri Ganesh.',
    category: 'Religious',
    latitude: 19.0169,
    longitude: 72.8304,
    rating: 4.9,
    visitingDuration: 60,
    city: 'Mumbai',
    image: 'temple.jpg'
  },
  {
    name: 'Juhu Beach',
    description: 'Popular beach known for sunset views and street food.',
    category: 'Beaches',
    latitude: 19.0991,
    longitude: 72.8263,
    rating: 4.2,
    visitingDuration: 120,
    city: 'Mumbai',
    image: 'juhu.jpg'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yatrasafe');
    console.log('MongoDB connected for seeding.');

    await Place.deleteMany();
    console.log('Old places removed.');

    await Place.insertMany(places);
    console.log('Seed places added!');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
