import React, { useState } from 'react';

const AdminPanel = ({ profiles, addProfile, deleteProfile, editProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };

    if (editId) {
      editProfile({ ...profileData, id: editId });
      setEditId(null);
    } else {
      addProfile(profileData);
    }

    setFormData({
      name: '',
      photo: '',
      description: '',
      address: '',
      lat: '',
      lng: '',
    });
  };

  const handleEditClick = (profile) => {
    setFormData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      address: profile.address,
      lat: profile.lat,
      lng: profile.lng,
    });
    setEditId(profile.id);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          name="lat"
          placeholder="Latitude"
          type="number"
          step="any"
          value={formData.lat}
          onChange={handleChange}
          required
        />
        <input
          name="lng"
          placeholder="Longitude"
          type="number"
          step="any"
          value={formData.lng}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Profile</button>
      </form>

      <h3>Existing Profiles</h3>
      {profiles.length === 0 && <p>No profiles available.</p>}
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} &nbsp;
            <button onClick={() => handleEditClick(profile)}>Edit</button> &nbsp;
            <button onClick={() => deleteProfile(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
