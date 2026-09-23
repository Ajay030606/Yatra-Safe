import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, Compass, LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLanding = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`w-full z-[100] transition-all duration-300 ${isLanding ? 'absolute top-0 left-0 bg-transparent py-4' : 'bg-white shadow-sm py-3 sticky top-0'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/logo-transparent.png" 
                alt="YatraSafe Logo" 
                className="h-10 w-auto object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
              />
              <span className={`text-2xl font-serif font-bold tracking-wide ${isLanding ? 'text-white' : 'text-brand-dark'}`}>
                Yatra<span className={isLanding ? 'text-brand-tan font-sans font-medium' : 'text-brand-teal font-sans font-medium'}>Safe</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className={`text-sm font-medium tracking-wide hover:text-brand-tan transition-colors ${isLanding ? 'text-white' : 'text-brand-dark'}`}>Dashboard</Link>
                <Link to="/search" className={`text-sm font-medium tracking-wide hover:text-brand-tan transition-colors ${isLanding ? 'text-white' : 'text-brand-dark'}`}>Plan Trip</Link>
                <Link to="/emergency" className="flex items-center text-sm font-bold text-red-600 hover:text-white bg-white hover:bg-red-600 px-4 py-2 rounded-full transition-all shadow-sm">
                  <Shield className="h-4 w-4 mr-1" />
                  SOS
                </Link>
                
                <div className={`border-l h-5 mx-2 ${isLanding ? 'border-white/30' : 'border-gray-200'}`}></div>
                
                <div className={`flex items-center space-x-2 text-sm font-medium ${isLanding ? 'text-white' : 'text-brand-dark'}`}>
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className={`p-2 rounded-full transition-colors ${isLanding ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:bg-gray-100 hover:text-brand-dark'}`}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-medium tracking-wide hover:text-brand-tan transition-colors ${isLanding ? 'text-white' : 'text-brand-dark'}`}>Log in</Link>
                <Link to="/register" className="bg-brand-tan hover:bg-brand-tan-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className={`p-2 ${isLanding ? 'text-white' : 'text-brand-dark'}`}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
