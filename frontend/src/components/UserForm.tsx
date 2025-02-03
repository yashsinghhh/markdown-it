import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


export const UserForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    about: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await user?.update({
        publicMetadata: {
          ...user.publicMetadata,
          hasCompletedOnboarding: true,
          name: formData.name,
          about: formData.about
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg px-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-8 space-y-1">
            <h2 className="text-3xl font-light text-gray-800 text-center tracking-wide">
              Complete Your Profile
            </h2>
            <p className="text-center text-gray-400 text-sm">
              Share a few details to personalize your experience
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder-gray-300"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                />
              </div>
              <div>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder-gray-300"
                  placeholder="About You"
                  value={formData.about}
                  onChange={(e) => setFormData(prev => ({...prev, about: e.target.value}))}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-300 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};