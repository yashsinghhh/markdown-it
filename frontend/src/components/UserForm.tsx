import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

type Role = 'author' | 'reader';

interface FormData {
  name: string;
  profilePhoto: string;
  about: string;
  socials: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  role: Role;
}

export const UserForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    profilePhoto: '',
    about: '',
    socials: {
      twitter: '',
      instagram: '',
      linkedin: '',
    },
    role: 'reader' // default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await user?.update({
        publicMetadata: {
          ...user.publicMetadata,
          hasCompletedOnboarding: true,
          ...formData
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Profile Photo Input */}
      <div>
        <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">
          Profile Photo URL
        </label>
        <input
          type="url"
          id="profilePhoto"
          value={formData.profilePhoto}
          onChange={(e) => setFormData(prev => ({ ...prev, profilePhoto: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* About Input */}
      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
          About You
        </label>
        <textarea
          id="about"
          value={formData.about}
          onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Socials Input */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Social Media Links</h3>
        
        <div>
          <label htmlFor="twitter" className="block text-sm text-gray-600">Twitter</label>
          <input
            type="url"
            id="twitter"
            value={formData.socials.twitter}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              socials: { ...prev.socials, twitter: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm text-gray-600">Instagram</label>
          <input
            type="url"
            id="instagram"
            value={formData.socials.instagram}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              socials: { ...prev.socials, instagram: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm text-gray-600">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            value={formData.socials.linkedin}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              socials: { ...prev.socials, linkedin: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select your role
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'reader' }))}
            className={`px-4 py-2 rounded-md ${
              formData.role === 'reader'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Reader
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'author' }))}
            className={`px-4 py-2 rounded-md ${
              formData.role === 'author'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Author
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Complete Profile
      </button>
    </form>
  );
};