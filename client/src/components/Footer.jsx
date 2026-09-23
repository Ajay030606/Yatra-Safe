import { Compass, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-gray-300 py-12 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 group mb-4">
            <span className="text-3xl font-serif font-bold text-white tracking-wide">
              Yatra<span className="text-brand-tan font-sans font-medium">Safe</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed font-medium">
            Explore India freely and safely. Your ultimate smart tourism guide and emergency companion.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-brand-tan font-bold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><Link to="/search" className="hover:text-white transition-colors">Plan a Trip</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Your Dashboard</Link></li>
            <li><Link to="/emergency" className="hover:text-white transition-colors">SOS / Safety</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-brand-tan font-bold uppercase tracking-wider text-sm mb-4">Support</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> contact@yatrasafe.com</li>
            <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +91 1800-123-456</li>
            <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> SIH Prototype HQ</li>
          </ul>
        </div>

        {/* Note */}
        <div>
          <h4 className="text-brand-tan font-bold uppercase tracking-wider text-sm mb-4">About</h4>
          <p className="text-sm text-gray-400 font-medium">
            Built for the Smart India Hackathon. Designed to ensure tourist safety while promoting incredible destinations.
          </p>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
        <p>© 2026 YatraSafe. All rights reserved.</p>
        <p className="mt-2 md:mt-0 flex items-center">
          Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for tourists everywhere.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
