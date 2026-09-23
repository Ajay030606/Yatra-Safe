import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-100 flex items-center justify-center rounded-full">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input name="name" type="text" required onChange={handleChange}
              className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input name="email" type="email" required onChange={handleChange}
              className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" required onChange={handleChange}
              className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Phone Number</label>
            <input name="phone" type="tel" required onChange={handleChange}
              className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div className="pt-4 border-t border-gray-200 mt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Emergency Contact Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input name="emergencyContactName" type="text" required onChange={handleChange}
                  className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input name="emergencyContactPhone" type="tel" required onChange={handleChange}
                  className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register Account
            </button>
          </div>
          
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign In here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
