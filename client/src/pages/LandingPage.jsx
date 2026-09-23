import { Link } from 'react-router-dom';
import { MapPin, CalendarClock, ShieldAlert } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-teal flex flex-col items-center px-4 sm:px-8 pb-8 pt-28 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-teal-dark/30 rounded-full blur-3xl mix-blend-overlay"></div>
      
      {/* Main Glass Container */}
      <div className="glass-container w-full max-w-7xl relative overflow-hidden flex flex-col shadow-2xl z-10">
        
        {/* Abstract Sky/Clouds at the top (simulated with CSS shapes) */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/60 to-transparent -z-10 rounded-t-2xl"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/80 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -top-40 -right-20 w-[40rem] h-[40rem] bg-white/70 rounded-full blur-2xl -z-10"></div>
        
        {/* Content Area */}
        <div className="flex-grow flex flex-col md:flex-row relative z-10 px-8 py-12 md:p-16">
          
          {/* Left Side: Typography & Buttons */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 mt-12 md:mt-0">
            <div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-none tracking-tight">
                Discover<br/>India
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-md font-medium leading-relaxed">
                Discover the most unexplored and beautiful places in India, with personalized AI itineraries and smart safety tracking.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center pt-4">
              <Link to="/register" className="bg-brand-tan hover:bg-brand-tan-dark text-brand-dark font-semibold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Join Now
              </Link>
              <Link to="/search" className="bg-transparent hover:bg-white/30 text-brand-dark font-semibold py-4 px-10 rounded-full text-lg border-2 border-brand-dark/20 hover:border-brand-dark/40 transition-all">
                Explore More
              </Link>
            </div>
          </div>
          
          {/* Right Side: Feature Cards - now all clickable links */}
          <div className="w-full md:w-1/2 flex flex-col justify-center mt-16 md:mt-0 space-y-5 relative pl-0 md:pl-10">
             <div className="absolute top-0 right-0 md:top-10 md:-right-10 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] rounded-2xl"></div>
             
             <Link to="/search" className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all border border-white/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-tan/20 p-3 rounded-full group-hover:bg-brand-tan/40 transition-colors">
                    <MapPin className="text-brand-tan-dark h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">Personalized Routes</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">Tailored suggestions based on your interests & budget.</p>
                  </div>
                </div>
                <span className="text-brand-tan-dark text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-4">→</span>
             </Link>

             <Link to="/search" className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all border border-white/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-teal/20 p-3 rounded-full group-hover:bg-brand-teal/40 transition-colors">
                    <CalendarClock className="text-brand-teal-dark h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">AI Trip Planner</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">Instantly generate optimized day-by-day itineraries.</p>
                  </div>
                </div>
                <span className="text-brand-teal-dark text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-4">→</span>
             </Link>

             <Link to="/emergency" className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all border border-white/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-200 transition-colors">
                    <ShieldAlert className="text-red-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">Smart SOS System</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">One-tap emergency alerts with live GPS tracking.</p>
                  </div>
                </div>
                <span className="text-red-500 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-4">→</span>
             </Link>
          </div>
          
        </div>
        
        {/* Bottom Abstract Element (Simulating the water reflection in the image) */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-brand-teal-light/60 to-transparent -z-10 rounded-b-2xl border-t border-white/20"></div>
      </div>
    </div>
  );
};

export default LandingPage;
