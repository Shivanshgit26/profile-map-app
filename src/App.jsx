import React, { useState } from 'react';
import ProfileCard from './ProfileCard.jsx';
import AdminPanel from './AdminPanel.jsx';
import MapComponent from './MapComponent.jsx';

function App() {
  // State to store profiles
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: 'Software engineer with 5 years experience.',
      address: '123 Main St',
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      description: 'Digital marketing specialist and content creator.',
      address: '456 Elm St',
      lat: 34.0522,
      lng: -118.2437,
    },
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);

  // Add profile
  const addProfile = (profile) => {
    setProfiles([...profiles, { ...profile, id: Date.now() }]);
  };

  // Delete profile
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  // Edit profile
  const editProfile = (updatedProfile) => {
    setProfiles(
      profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
    setSelectedProfile(null);
  };

  return (
    <div className="container">
      <h1>User Profiles</h1>

      {/* Show profile cards */}
      <div className="profiles">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummaryClick={() => setSelectedProfile(profile)}
          />
        ))}
      </div>

      {/* Show map for selected profile */}
      {selectedProfile && (
        <MapComponent location={{ lat: selectedProfile.lat, lng: selectedProfile.lng }} />
      )}

      {/* Admin Panel */}
      <AdminPanel
        profiles={profiles}
        addProfile={addProfile}
        deleteProfile={deleteProfile}
        editProfile={editProfile}
      />
    </div>
  );
}

export default App;
