import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, MapPin, Calendar, IndianRupee, Tag } from 'lucide-react';

const INTERESTS = ['Historical', 'Nature', 'Adventure', 'Religious', 'Beaches', 'Museums', 'Shopping', 'Food'];

const SearchDestinations = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 'Medium',
    interests: []
  });
  
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      const { data } = await axios.post('http://localhost:5000/api/itinerary/generate', formData, config);
      navigate(`/planner?id=${data._id}`);
    } catch (error) {
      console.error('Error generating itinerary', error);
      alert('Failed to generate itinerary. Ensure backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4 py-12 pt-24 relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-teal-light/20 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-tan-light/20 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/4"></div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Craft Your Perfect Journey</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">Tell us where you want to go and what you love, and our AI will curate an unforgettable experience.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-3 flex items-center uppercase tracking-wider">
                  <MapPin className="h-4 w-4 mr-2 text-brand-teal" />
                  Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mumbai, Jaipur, Goa"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all font-medium text-lg"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-3 flex items-center uppercase tracking-wider">
                  <Calendar className="h-4 w-4 mr-2 text-brand-teal" />
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all font-medium text-lg"
                  value={formData.days}
                  onChange={(e) => setFormData({...formData, days: e.target.value})}
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-brand-dark mb-4 flex items-center uppercase tracking-wider">
                <IndianRupee className="h-4 w-4 mr-2 text-brand-teal" />
                Budget Level
              </label>
              <div className="flex flex-wrap gap-4">
                {['Low', 'Medium', 'High'].map(budget => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({...formData, budget})}
                    className={`flex-1 min-w-[120px] py-4 rounded-xl font-bold transition-all border-2 ${
                      formData.budget === budget 
                        ? 'border-brand-teal bg-brand-teal/10 text-brand-teal-dark shadow-sm' 
                        : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-12">
              <label className="block text-sm font-bold text-brand-dark mb-4 flex items-center uppercase tracking-wider">
                <Tag className="h-4 w-4 mr-2 text-brand-teal" />
                Experiences
              </label>
              <div className="flex flex-wrap gap-3">
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all ${
                      formData.interests.includes(interest)
                        ? 'border-brand-tan bg-brand-tan text-white shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-brand-tan hover:text-brand-tan-dark'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.destination}
              className="w-full bg-brand-dark text-white font-bold text-lg py-5 rounded-2xl hover:bg-gray-800 transition-colors shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-1"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-tan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Curating Your Journey...
                </span>
              ) : (
                <span className="flex items-center text-brand-tan">
                  <Search className="h-6 w-6 mr-3 text-brand-tan" />
                  Generate Itinerary
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchDestinations;
