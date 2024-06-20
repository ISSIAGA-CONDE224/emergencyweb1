// // components/Map.js

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Map = () => {
//   const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const response = await axios.get('/api/coordinates');
//         const { latitude, longitude } = response.data;
//         setCoordinates({ lat: latitude, lng: longitude });
//       } catch (error) {
//         console.error("Error fetching coordinates:", error);
//       }
//     };

//     fetchCoordinates();
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//       <GoogleMap
//         mapContainerStyle={{ width: '100%', height: '400px' }}
//         center={coordinates}
//         zoom={10}
//       >
//         <Marker position={coordinates} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '200px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
