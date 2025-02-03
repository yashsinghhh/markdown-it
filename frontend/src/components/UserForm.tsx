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
    role: 'reader', // default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save user data directly to Supabase
      const response = await fetch('http://localhost:5174/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          name: formData.name,
          profilePhoto: formData.profilePhoto,
          about: formData.about,
          socials: formData.socials,
          role: formData.role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save user profile');
      }

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
        {['twitter', 'instagram', 'linkedin'].map((platform) => (
          <div key={platform}>
            <label htmlFor={platform} className="block text-sm text-gray-600">{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
            <input
              type="url"
              id={platform}
              value={formData.socials[platform]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socials: { ...prev.socials, [platform]: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select your role
        </label>
        <div className="flex space-x-4">
          {['reader', 'author'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, role }))}
              className={`px-4 py-2 rounded-md ${formData.role === role ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
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
