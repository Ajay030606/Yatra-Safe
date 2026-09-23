import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Map, Calendar, Shield, Clock, Compass } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [itineraries, setItineraries] = useState([]);
  
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get('http://localhost:5000/api/itinerary', config);
        setItineraries(data);
      } catch (error) {
        console.error('Error fetching itineraries', error);
      }
    };
    
    if (user) {
      fetchItineraries();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-brand-light p-4 sm:p-8 pt-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-brand-teal-light/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Welcome back, {user?.name}</h1>
            <p className="text-lg text-gray-600 mt-4 font-medium">Your next adventure awaits.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <span className="bg-brand-teal-light/30 text-brand-teal-dark px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
              Tourist Profile
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Quick Action Cards */}
          <Link to="/search" className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-tan/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <div className="bg-brand-tan/20 p-4 rounded-2xl text-brand-tan-dark w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-brand-tan group-hover:text-white transition-colors">
              <Compass className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Plan a Trip</h3>
            <p className="text-gray-500 font-medium">Discover new destinations and let AI curate your perfect route.</p>
          </Link>
          
          <Link to="/emergency" className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <div className="bg-red-100 p-4 rounded-2xl text-red-600 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Safety & SOS</h3>
            <p className="text-gray-500 font-medium">Access your smartwatch simulator and emergency contacts.</p>
          </Link>

          {/* Stats Card */}
          <div className="bg-brand-dark rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
             <h3 className="font-serif text-2xl font-bold mb-6 text-brand-tan">Travel Stats</h3>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Trips Planned</p>
                 <p className="text-4xl font-serif font-bold text-white">{itineraries.length}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Days Travelled</p>
                 <p className="text-4xl font-serif font-bold text-brand-tan">{itineraries.reduce((acc, curr) => acc + curr.days.length, 0)}</p>
               </div>
             </div>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-serif font-bold text-brand-dark">Your Itineraries</h2>
        </div>

        {itineraries.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <Calendar className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-3">Your canvas is blank</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-md">Start planning your first adventure to see your personalized itineraries appear here.</p>
            <Link to="/search" className="bg-brand-dark text-brand-tan font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg">
              Start Planning
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <div key={itinerary._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 bg-brand-teal relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-serif text-2xl font-bold text-white">{itinerary.destination}</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-brand-dark">
                    {itinerary.days.length} Days
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl">
                    <Clock className="h-4 w-4 mr-2 text-brand-teal" />
                    <span>
                      {new Date(itinerary.startDate).toLocaleDateString()} &mdash; {new Date(itinerary.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Link to={`/planner?id=${itinerary._id}`} className="block text-center w-full bg-brand-tan/10 text-brand-tan-dark font-bold py-3 rounded-xl hover:bg-brand-tan hover:text-white transition-colors">
                    View Itinerary
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
