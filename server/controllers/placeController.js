const Place = require('../models/Place');

const getPlaces = async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = { $regex: req.query.city, $options: 'i' };
    const places = await Place.find(filter);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    const createdPlace = await place.save();
    res.status(201).json(createdPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      await place.deleteOne();
      res.json({ message: 'Place removed' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlaces, getPlaceById, createPlace, deletePlace };
