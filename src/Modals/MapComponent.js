import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponent.css";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function FlyTo({ center }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, 12);
  }, [center, map]);
  return null;
}

const MapPage = () => {
  const [zipCode, setZipCode] = useState("");
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]); // Default to San Francisco
  const [centers, setCenters] = useState([]);

  const handleSearch = async () => {
    if (!zipCode) return alert("Please enter a ZIP code!");

    try {
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: zipCode,
            format: "json",
          },
        }
      );

      if (geocodeResponse.data.length === 0) {
        alert("Invalid ZIP code. Please try again.");
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      setMapCenter([parseFloat(lat), parseFloat(lon)]);

      // Simulate fetching nearby centers
      const nearbyCenters = [
        { id: 1, name: "Center 1", lat: parseFloat(lat) + 0.01, lon: parseFloat(lon) + 0.01 },
        { id: 2, name: "Center 2", lat: parseFloat(lat) - 0.01, lon: parseFloat(lon) - 0.01 },
        { id: 3, name: "Center 3", lat: parseFloat(lat) + 0.02, lon: parseFloat(lon) - 0.02 },
      ];
      setCenters(nearbyCenters);
    } catch (error) {
      console.error("Error fetching location data:", error);
      alert("Unable to fetch location. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Find Centers Near You</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Search
        </button>
      </div>
      <div style={{ height: "500px", width: "80%" }}>
        <MapContainer className="map-container" center={mapCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
          <FlyTo center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {centers.map((center) => (
            <Marker key={center.id} position={[center.lat, center.lon]}>
              <Popup>{center.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
