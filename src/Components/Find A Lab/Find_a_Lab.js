import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Journey/journey.css";
import { LocationContext } from "../../utils/LocationContext";

export const testCenters = [
  { id: 1, name: "Clinical Pathology Labs", lat: 30.625, lng: -96.334, distance: "17.3mi" },
  { id: 2, name: "College Station Test Center", lat: 30.614, lng: -96.321, distance: "5.2mi" },
  { id: 3, name: "Navasota Medical", lat: 30.387, lng: -96.089, distance: "29.8mi" },
];

// Define a custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [32, 32],
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
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const navigate = useNavigate();

  const [zipCode, setZipCode] = useState("");
  const [showOpen, setShowOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState([30.6, -96.3]);
  const [searchNote, setSearchNote] = useState("");

  const handleLocationClick = (lat, lng, name) => {
    setSelectedLocation(name);
    setMapCenter([lat, lng]);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchNote(
      zipCode
        ? `Showing the centers closest to ${zipCode}.`
        : "Enter a ZIP code to sort centers by distance."
    );
  };

  return (
    <section className="sh-journey">
      <p className="j-notice">
        These centers do not accept payment. Place and pay for your order online before you visit.
      </p>
      <div className="j-shell">
        <div className="j-eyebrow">SATELLITE HEALTH · FIND A LAB</div>
        <h1 className="j-title">Find a lab near you.</h1>
        <p className="j-intro">
          Choose a convenient location for your sample collection. Your choice is carried through to
          checkout.
        </p>

        <form className="j-panel" onSubmit={handleSearch}>
          <label htmlFor="lab-zip">ZIP code</label>
          <div className="j-grid">
            <input
              id="lab-zip"
              type="text"
              inputMode="numeric"
              placeholder="32738"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <button type="submit" className="j-button">
              Search labs
            </button>
          </div>
          <label className="j-check">
            <input
              type="checkbox"
              checked={showOpen}
              onChange={() => setShowOpen(!showOpen)}
            />
            <span>Open Saturdays</span>
          </label>
          {searchNote && <p className="j-hint">{searchNote}</p>}
        </form>

        <div className="j-lab-layout">
          <div className="j-lab-list">
            {testCenters.map((center) => {
              const chosen = selectedLocation === center.name;
              return (
                <article className="j-panel" key={center.id}>
                  <div>
                    <span className="j-tag">TEST CENTER</span>
                    <h3>{center.name}</h3>
                    <p className="j-hint">Distance: {center.distance}</p>
                  </div>
                  <button
                    type="button"
                    className={`j-button ${chosen ? "" : "j-button--secondary"}`}
                    onClick={() => handleLocationClick(center.lat, center.lng, center.name)}
                  >
                    {chosen ? "Selected" : "Choose this center"}
                  </button>
                </article>
              );
            })}

            <div className="j-panel">
              <div>
                <span className="j-tag">YOUR SELECTION</span>
                <h3>{selectedLocation || "No center selected yet"}</h3>
              </div>
              <button
                type="button"
                className="j-button"
                disabled={!selectedLocation}
                onClick={() => navigate("/price-packages")}
              >
                Continue to tests
              </button>
            </div>
          </div>

          <div className="j-map">
            <MapContainer center={mapCenter} zoom={10} className="leaflet-container">
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
      </div>
    </section>
  );
};

export default TestCentersMap;
