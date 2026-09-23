import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Map, Hotel, ShieldAlert, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">124</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Users className="h-6 w-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Tourist Places</p>
            <p className="text-3xl font-bold text-gray-900">86</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <Map className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Hotels & Food</p>
            <p className="text-3xl font-bold text-gray-900">42</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
            <Hotel className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Alerts</p>
            <p className="text-3xl font-bold text-red-600">3</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-gray-500" />
          Recent Activity
        </h2>
        <p className="text-gray-500">Admin management features (CRUD for Places, Hotels, Restaurants) are implemented in the API. UI implementation goes here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
