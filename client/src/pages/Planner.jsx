import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, MapPin, Navigation, Calendar, Settings, ArrowRight, Star } from 'lucide-react';
import L from 'leaflet';

// Fix default Leaflet icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Numbered custom marker icons
const createNumberedIcon = (number, color = '#64a19d') =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        background:${color};
        color:#fff;
        width:34px;
        height:34px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:bold;
        font-size:14px;
        border:3px solid #fff;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ">
        <span style="transform:rotate(45deg)">${number}</span>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });

// Auto-fit map to all markers on day change
const AutoFitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [positions, map]);
  return null;
};

const Planner = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const itineraryId = searchParams.get('id');
  
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`http://localhost:5000/api/itinerary/${itineraryId}`, config);
        setItinerary(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching itinerary', error);
        setLoading(false);
      }
    };
    if (itineraryId) fetchItinerary();
  }, [itineraryId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-teal/20 border-t-brand-teal mb-6"></div>
        <h2 className="font-serif text-2xl text-brand-dark font-bold">Crafting your itinerary...</h2>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center font-serif text-2xl text-brand-dark">
        Itinerary not found.
      </div>
    );
  }

  const currentDayData = itinerary.days.find(d => d.dayNumber === activeDay);

  // Extract markers only for activities that have a real place with lat/lng
  const markers = (currentDayData?.activities || [])
    .filter(act => act.place && act.place.latitude && act.place.longitude)
    .map((act, idx) => ({
      id: act._id || idx,
      number: idx + 1,
      name: act.place.name,
      lat: act.place.latitude,
      lng: act.place.longitude,
      category: act.place.category,
      rating: act.place.rating,
      city: act.place.city,
      duration: act.estimatedDuration,
      time: `${act.startTime} – ${act.endTime}`,
    }));

  const positions = markers.map(m => [m.lat, m.lng]);
  const mapCenter = markers.length > 0 ? [markers[0].lat, markers[0].lng] : [20.5937, 78.9629];

  return (
    <div className="min-h-screen bg-brand-light pt-20 pb-12 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-80 bg-brand-teal/10 -z-10 transform skew-y-3 -translate-y-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col lg:flex-row gap-8">

        {/* ─── Left Column: Itinerary Details ─── */}
        <div className="lg:w-[45%] flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>

          {/* Header */}
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-sm border border-white px-8 py-6 mb-5">
            <h1 className="text-4xl font-serif font-bold text-brand-dark">{itinerary.destination}</h1>
            <div className="flex flex-wrap items-center text-gray-500 font-medium mt-3 gap-4 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-brand-teal"/>
                {new Date(itinerary.startDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-brand-tan-dark"/>
                {itinerary.days.length} Day{itinerary.days.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Day Selector */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-4 flex-shrink-0">
            <div className="flex overflow-x-auto scrollbar-hide gap-1">
              {itinerary.days.map(day => {
                const dayData = itinerary.days.find(d => d.dayNumber === day.dayNumber);
                const placeCount = (dayData?.activities || []).filter(a => a.place).length;
                const isActive = activeDay === day.dayNumber;
                return (
                  <button
                    key={day._id}
                    onClick={() => { setActiveDay(day.dayNumber); setSelectedMarker(null); }}
                    className={`flex-shrink-0 flex flex-col items-center px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-dark text-white shadow-md scale-[1.03]'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                    }`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isActive ? 'text-brand-tan' : 'text-gray-400'}`}>
                      Day
                    </span>
                    <span className="text-xl font-serif font-bold leading-none">{day.dayNumber}</span>
                    <span className={`mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-brand-tan/20 text-brand-tan' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {placeCount} stop{placeCount !== 1 ? 's' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline – scrollable */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-7 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-serif font-bold text-brand-dark">Day {activeDay} Schedule</h2>
              <span className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {markers.length} Stops
              </span>
            </div>

            {markers.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No places with GPS data for this day.</p>
              </div>
            )}

            <div className="relative border-l-2 border-brand-teal/30 ml-4 space-y-8">
              {(currentDayData?.activities || []).map((activity, index) => {
                const isPlace = activity.place && activity.place.latitude;
                const markerNum = markers.findIndex(m => m.id === (activity._id || index)) + 1;
                return (
                  <div
                    key={activity._id || index}
                    className={`relative pl-10 cursor-pointer`}
                    onClick={() => isPlace && setSelectedMarker(markerNum - 1)}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-[13px] top-1 h-6 w-6 rounded-full border-[3px] border-white shadow flex items-center justify-center text-xs font-bold text-white ${isPlace ? 'bg-brand-teal' : 'bg-gray-300'}`}>
                      {isPlace ? markerNum : ''}
                    </div>

                    <div className={`rounded-2xl p-5 border transition-all ${
                      selectedMarker === markerNum - 1 && isPlace
                        ? 'border-brand-teal bg-brand-teal/5 shadow-md'
                        : 'border-gray-100 bg-white hover:shadow-sm'
                    }`}>
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <span className="text-xs font-bold text-brand-teal-dark bg-brand-teal/10 px-2.5 py-1 rounded-lg flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.startTime} <ArrowRight className="h-3 w-3 mx-1" /> {activity.endTime}
                        </span>
                        {activity.place && (
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            {activity.place.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-bold text-brand-dark mt-1">
                        {activity.place ? activity.place.name : activity.customActivityName}
                      </h3>

                      {activity.place && (
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                          <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1 text-brand-tan-dark" />{activity.place.city}</span>
                          <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />{activity.estimatedDuration} mins</span>
                          {activity.place.rating && (
                            <span className="flex items-center text-amber-500">
                              <Star className="h-3.5 w-3.5 mr-0.5 fill-amber-400" />{activity.place.rating}
                            </span>
                          )}
                          {isPlace && (
                            <span className="text-brand-teal underline text-xs">View on Map →</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right Column: Interactive Map ─── */}
        <div className="lg:w-[55%] sticky top-24 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white" style={{ height: 'calc(100vh - 7rem)' }}>

          {/* Stats bar above the map */}
          <div className="absolute top-4 left-4 right-4 z-[500] flex gap-3">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-bold text-brand-dark">
              <div className="w-3 h-3 rounded-full bg-brand-teal"></div>
              {markers.length} Places – Day {activeDay}
            </div>
            {markers.length > 1 && (
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-bold text-gray-500">
                <Navigation className="h-4 w-4 text-brand-tan-dark" />
                Route drawn
              </div>
            )}
          </div>

          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
          >
            {/* Free OpenStreetMap tiles – no API key needed */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />

            {/* Auto-fit map to visible markers */}
            <AutoFitBounds positions={positions} />

            {/* Route polyline */}
            {positions.length > 1 && (
              <Polyline
                positions={positions}
                pathOptions={{ color: '#64a19d', weight: 3, dashArray: '8 6', opacity: 0.9 }}
              />
            )}

            {/* Numbered markers */}
            {markers.map((marker, idx) => (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                icon={createNumberedIcon(marker.number, selectedMarker === idx ? '#e6b772' : '#64a19d')}
                eventHandlers={{ click: () => setSelectedMarker(idx) }}
              >
                <Popup maxWidth={260}>
                  <div className="p-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brand-teal text-white text-xs font-bold px-2 py-0.5 rounded-full">Stop {marker.number}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{marker.category}</span>
                    </div>
                    <div className="font-bold text-base text-gray-900">{marker.name}</div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{marker.time}</span>
                      {marker.rating && <span className="flex items-center gap-1 text-amber-500">★ {marker.rating}</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />{marker.city}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Bottom overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-[500] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm font-bold text-brand-dark">
              <div className="bg-brand-tan/20 p-2 rounded-xl">
                <Navigation className="h-4 w-4 text-brand-tan-dark" />
              </div>
              Optimized route · Day {activeDay}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <span>Click a pin for details</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Planner;
