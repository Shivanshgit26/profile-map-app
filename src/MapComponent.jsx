
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ location }) => {
  if (!location || !location.lat || !location.lng) {
    return <p>Location data is not available</p>;
  }

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      scrollWheelZoom={true} 
      style={{ height: '400px', width: '100%', marginTop: '20px' }}
     
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>
          Profile Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
