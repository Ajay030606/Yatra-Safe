const Itinerary = require('../models/Itinerary');
const Place = require('../models/Place');

const generateItinerary = async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;
    
    // Simplistic Logic for prototype
    const places = await Place.find({ city: { $regex: destination, $options: 'i' } });
    
    // Sort places by category match with interests
    const scoredPlaces = places.map(place => {
      let score = 0;
      if (interests.includes(place.category)) score += 5;
      score += place.rating;
      return { place, score };
    }).sort((a, b) => b.score - a.score).map(p => p.place);

    const itineraryDays = [];
    let placeIndex = 0;

    for (let i = 1; i <= days; i++) {
        let activities = [];
        let startTime = 9; // 9 AM
        
        // Add 2-3 places per day
        for(let j=0; j<2; j++) {
            if (placeIndex < scoredPlaces.length) {
                const currentPlace = scoredPlaces[placeIndex];
                activities.push({
                    startTime: `${startTime.toString().padStart(2, '0')}:00`,
                    endTime: `${(startTime + 2).toString().padStart(2, '0')}:00`,
                    place: currentPlace._id,
                    estimatedDuration: currentPlace.visitingDuration || 120
                });
                startTime += 3;
                placeIndex++;
            }
        }
        
        // Add lunch
        activities.splice(1, 0, {
            startTime: "13:00",
            endTime: "14:00",
            customActivityName: "Lunch",
            estimatedDuration: 60
        });

        itineraryDays.push({
            dayNumber: i,
            activities
        });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + parseInt(days));

    const itinerary = await Itinerary.create({
        user: req.user._id,
        destination,
        startDate,
        endDate,
        days: itineraryDays
    });

    const populatedItinerary = await Itinerary.findById(itinerary._id).populate('days.activities.place');

    res.status(201).json(populatedItinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItineraries = async (req, res) => {
    try {
      const itineraries = await Itinerary.find({ user: req.user._id }).populate('days.activities.place');
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getItineraryById = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id).populate('days.activities.place');
        if (itinerary && itinerary.user.toString() === req.user._id.toString()) {
            res.json(itinerary);
        } else {
            res.status(404).json({ message: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generateItinerary, getItineraries, getItineraryById };
