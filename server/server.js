require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection with connection caching for serverless environments
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yatrasafe');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

// Ensure DB is connected before handling API requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Immediate connect attempt
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/itinerary', require('./routes/itineraryRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));

// Health check routes
app.get('/api', (req, res) => {
  res.send('YatraSafe API is running...');
});

app.get('/', (req, res) => {
  res.send('YatraSafe API is running...');
});

const PORT = process.env.PORT || 5000;

// Only listen directly when running locally or on non-serverless hosts
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
