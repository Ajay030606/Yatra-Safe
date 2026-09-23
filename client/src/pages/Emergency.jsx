import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { ShieldAlert, MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';

const Emergency = () => {
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, sent, error
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await api.get('/emergency/history', config);
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history', error);
    }
  };

  const handleEmergency = () => {
    setStatus('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          
          try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.post('/emergency', {
              latitude: lat,
              longitude: lng
            }, config);
            
            setStatus('sent');
            fetchHistory();
          } catch (error) {
            console.error('Error sending alert', error);
            setStatus('error');
          }
        },
        (error) => {
          console.error("Geolocation error", error);
          setStatus('error');
          alert("Could not get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light p-4 sm:p-8 pt-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Smartwatch Simulation */}
        <div className="lg:w-1/3 flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-3">Safety & SOS</h2>
            <p className="text-gray-600 font-medium">Smartwatch Simulator</p>
          </div>
          
          <div className="relative bg-gray-900 rounded-[3.5rem] p-4 shadow-2xl border-[16px] border-gray-800 w-80 h-96 flex flex-col justify-between overflow-hidden">
            {/* Glossy overlay for realism */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
            
            {/* Status Bar */}
            <div className="flex justify-between items-center text-gray-400 text-xs px-4 pt-2 font-medium z-10">
              <span>YatraSafe</span>
              <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            
            {/* Main Display */}
            <div className="flex-grow flex flex-col items-center justify-center text-center px-6 z-10">
              {status === 'idle' && (
                <>
                  <ShieldAlert className="h-14 w-14 text-brand-teal mb-4 opacity-80" />
                  <p className="text-white text-base font-bold">System Ready</p>
                  <p className="text-gray-400 text-xs mt-2">Tap below in case of emergency</p>
                </>
              )}
              
              {status === 'loading' && (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-brand-tan mb-4"></div>
                  <p className="text-white text-sm font-medium">Acquiring GPS...</p>
                </>
              )}
              
              {status === 'sent' && (
                <>
                  <div className="bg-red-500/20 rounded-full p-4 mb-3 animate-pulse">
                    <AlertTriangle className="h-12 w-12 text-red-500" />
                  </div>
                  <h3 className="text-red-500 font-bold text-xl tracking-wider">ALERT SENT</h3>
                  <p className="text-gray-300 text-xs mt-3 bg-black/50 rounded-lg p-2 font-mono">
                    Lat: {location?.lat.toFixed(4)}<br/>
                    Lng: {location?.lng.toFixed(4)}
                  </p>
                </>
              )}

              {status === 'error' && (
                <>
                  <AlertTriangle className="h-14 w-14 text-brand-tan mb-4" />
                  <p className="text-white text-sm font-bold">Failed to Send</p>
                </>
              )}
            </div>
            
            {/* Emergency Button */}
            <button 
              onClick={handleEmergency}
              disabled={status === 'loading'}
              className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold py-5 rounded-[2rem] shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center justify-center uppercase tracking-widest text-sm disabled:opacity-50 z-10"
            >
              <ShieldAlert className="h-5 w-5 mr-3" />
              SOS
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-8 text-center max-w-sm font-medium leading-relaxed">
            This simulates the SIH hardware component. Clicking the button captures your browser's GPS location and immediately notifies your emergency contacts.
          </p>
        </div>

        {/* Right Column: Dashboard & History */}
        <div className="lg:w-2/3">
          
          {/* Emergency Contact Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-[100px] -z-10"></div>
            
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6 flex items-center">
              <Phone className="h-6 w-6 mr-3 text-brand-teal" />
              Emergency Contacts
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center border border-gray-100">
              <div>
                <p className="font-bold text-brand-dark text-lg">{user?.emergencyContactName || 'Not Set'}</p>
                <p className="text-gray-600 font-medium mt-1">{user?.emergencyContactPhone || 'N/A'}</p>
              </div>
              <button className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-full text-brand-teal-dark font-bold hover:border-brand-teal transition-colors shadow-sm">
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-5 font-medium">
              When an SOS is triggered, an SMS and live tracking link will be sent directly to this contact.
            </p>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-brand-tan-dark" />
              Alert History
            </h3>
            
            {history.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <ShieldAlert className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No emergency alerts in your history.</p>
                <p className="text-xs text-gray-400 mt-1">Stay safe out there!</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {history.map((alert) => (
                      <tr key={alert._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-brand-dark">
                          {new Date(alert.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-brand-teal" />
                            {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                            alert.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {alert.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
