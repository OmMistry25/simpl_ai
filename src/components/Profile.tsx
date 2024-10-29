import React, { useState } from 'react';
import { User, Mail, TrendingUp } from 'lucide-react';

interface ProfileProps {
  setProductivityGoal: (goal: number) => void;
  productivityGoal: number;
  userName: string;
  setUserName: (name: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ setProductivityGoal, productivityGoal, userName, setUserName }) => {
  const [profile, setProfile] = useState({
    name: userName,
    email: 'john@example.com',
    bio: 'I love using Simpl.ai to organize my life!',
  });

  const [editing, setEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    setUserName(profile.name);
  };

  const handleProductivityGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setProductivityGoal(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border rounded p-3"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full border rounded p-3"
            />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full border rounded p-3"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1">Productivity Goal (%)</label>
            <input
              type="number"
              value={productivityGoal}
              onChange={handleProductivityGoalChange}
              className="w-full border rounded p-3"
              min="1"
              max="100"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><User className="inline mr-2" /><strong>Name:</strong> {profile.name}</p>
          <p><Mail className="inline mr-2" /><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><TrendingUp className="inline mr-2" /><strong>Productivity Goal:</strong> {productivityGoal}%</p>
          <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;