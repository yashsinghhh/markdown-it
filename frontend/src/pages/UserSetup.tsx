import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'author' | 'reader' | null>(null);
  const [name, setName] = useState(user?.fullName || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.imageUrl || '');
  const [about, setAbout] = useState('');
  const [socials, setSocials] = useState({ twitter: '', linkedin: '' });

  const handleSubmit = async () => {
    if (!role) return alert('Please select a role.');

    try {
      await axios.post('/api/users/register', {
        clerkId: user?.id,
        name,
        profilePhoto,
        about,
        socials,
        role,
      });

      navigate(role === 'author' ? '/author-dashboard' : '/reader-dashboard');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container">
      <h2>Welcome! What brings you here?</h2>
      <button onClick={() => setRole('author')}>I want to write blogs</button>
      <button onClick={() => setRole('reader')}>I just want to read</button>

      {role && (
        <div>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Profile Photo URL" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} />
          <textarea placeholder="About you" value={about} onChange={(e) => setAbout(e.target.value)} />
          <input type="text" placeholder="Twitter URL" onChange={(e) => setSocials({ ...socials, twitter: e.target.value })} />
          <input type="text" placeholder="LinkedIn URL" onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })} />
          <button onClick={handleSubmit}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default UserSetup;
