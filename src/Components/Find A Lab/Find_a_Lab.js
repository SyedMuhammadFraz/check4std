import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearchLocation } from "react-icons/fa";
import { Switch } from "@mui/material";
import "./Find_a_lab.css";
import { LocationContext } from "../../utils/LocationContext";

const testCenters = [
  { id: 1, name: "Clinical Pathology Labs", lat: 30.625, lng: -96.334, distance: "17.3mi" },
  { id: 2, name: "College Station Test Center", lat: 30.614, lng: -96.321, distance: "5.2mi" },
  { id: 3, name: "Navasota Medical", lat: 30.387, lng: -96.089, distance: "29.8mi" },
  { id: 1, name: "Clinical Pathology Labs", lat: 30.625, lng: -96.334, distance: "17.3mi" },
  { id: 2, name: "College Station Test Center", lat: 30.614, lng: -96.321, distance: "5.2mi" },
  { id: 3, name: "Navasota Medical", lat: 30.387, lng: -96.089, distance: "29.8mi" },
];

// Define a custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", // Replace with your desired icon URL
  iconSize: [32, 32], // Adjust size as needed
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function FlyToLocation({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 12, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

const TestCentersMap = () => {
  const { setSelectedLocation } = useContext(LocationContext);

  const [zipCode, setZipCode] = useState("");
  const [showOpen, setShowOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState([30.6, -96.3]);

  const handleLocationClick = (lat, lng, name) => {
    setSelectedLocation(name);
    setMapCenter([lat, lng]);
  };

  return (
    <div className="test-centers-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>STD Test Centers</h2>
        <p>These centers do not accept payment. Order and pay online before visiting.</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <button>
            <FaSearchLocation size={20} />
          </button>
        </div>

        <div className="switch-container">
          <Switch checked={showOpen} onChange={() => setShowOpen(!showOpen)} />
          <span>Open Saturdays</span>
        </div>

        <div className="test-center-list">
          {testCenters.map((center) => (
            <div key={center.id} className="test-center">
              <h3>{center.name}</h3>
              <p>Distance: {center.distance}</p>
              <button className="choose-location" onClick={() => handleLocationClick(center.lat, center.lng, center.name)}>
                Choose This Location
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={10}
          className="leaflet-container"
          style={{ height: "100%", width: "100%" }}
        >
          <FlyToLocation center={mapCenter} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {testCenters.map((center) => (
            <Marker key={center.id} position={[center.lat, center.lng]} icon={customIcon}>
              <Popup>
                <strong>{center.name}</strong>
                <p>Distance: {center.distance}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TestCentersMap;
