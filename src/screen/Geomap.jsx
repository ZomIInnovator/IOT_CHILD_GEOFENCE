import { useEffect, useMemo, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";

const DEFAULT_EMPLOYEE_POSITION = [7.826611, 123.4469];
//const SMS_RECIPIENT_NUMBER = "09530769905";

function getDistanceInMeters(from, to) {
  const earthRadiusInMeters = 6371000;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const lat1 = toRadians(from[0]);
  const lat2 = toRadians(to[0]);
  const deltaLat = toRadians(to[0] - from[0]);
  const deltaLng = toRadians(to[1] - from[1]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  return earthRadiusInMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function BaseLocationPicker({ onSelectBase }) {
  useMapEvents({
    click(event) {
      onSelectBase([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

function Geomap() {
  const [employeePosition, setEmployeePosition] = useState(null);
  const [basePosition, setBasePosition] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [contactno, setContactno] = useState("");
  const [meters, setMeters] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setEmployeePosition(DEFAULT_EMPLOYEE_POSITION);
      setLoading(false);
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  const allowedMeters = Math.max(Number(meters) || 0, 0);
  const hasRadius = allowedMeters > 0;
  const distanceFromBase = useMemo(() => {
    if (!basePosition || !employeePosition) return null;

    return getDistanceInMeters(basePosition, employeePosition);
  }, [basePosition, employeePosition]);

  const isOutsideCircle =
    distanceFromBase !== null && hasRadius && distanceFromBase > allowedMeters;

  if (loading || !employeePosition) {
    return <div className="map-loading">Loading map...</div>;
  }

  return (
    <main className="map-page">
      <section className="map-controls" aria-label="Map controls">
        <label>
          Employee ID
          <input
            name="employeeId"
            type="text"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
            placeholder="Employee ID"
          />
        </label>
        <label>
          Mobile Number
          <input
            name="contactno"
            type="number"
            value={contactno}
            onChange={(event) => setContactno(event.target.value)}
            placeholder="Mobile Number"
          />
        </label>
        <label>
          Meters
          <input
            name="meters"
            type="number"
            min="1"
            value={meters}
            placeholder="Employee ID"
          />
        </label>
        <label>
          Meters
          <input
            name="meters"
            type="number"
            min="1"
            value={meters}
            onChange={(event) => setMeters(event.target.value)}
          />
        </label>

        <div className="base-details">
          <span>Main base</span>
          {basePosition ? (
            <strong>
              {basePosition[0].toFixed(6)}, {basePosition[1].toFixed(6)}
            </strong>
          ) : (
            <strong>No base selected</strong>
          )}
        </div>

        {distanceFromBase !== null && hasRadius && (
          <div
            className={
              isOutsideCircle ? "status status-alert" : "status status-ok"
            }
          >
            {isOutsideCircle
              ? "You're out of the circle."
              : `Inside circle: ${Math.round(distanceFromBase)} meters from base.`}
          </div>
        )}
      </section>

      <MapContainer center={employeePosition} zoom={13} className="leaflet-map">
        <BaseLocationPicker onSelectBase={setBasePosition} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {basePosition && (
          <>
            <Circle
              center={basePosition}
              radius={allowedMeters}
              pathOptions={{
                color: isOutsideCircle ? "#dc2626" : "#16a34a",
                fillColor: isOutsideCircle ? "#ef4444" : "#22c55e",
                fillOpacity: 0.14,
              }}
            />
            <Marker position={basePosition}>
              <Popup>
                Main Base
                <br />
                Lat: {basePosition[0].toFixed(6)}
                <br />
                Lng: {basePosition[1].toFixed(6)}
              </Popup>
            </Marker>
          </>
        )}

        <Marker position={employeePosition}>
          <Popup>
            Employee {employeeId || "Location"}
            <br />
            Lat: {employeePosition[0]}
            <br />
            Lng: {employeePosition[1]}
            {distanceFromBase !== null && (
              <>
                <br />
                Distance: {Math.round(distanceFromBase)} meters
              </>
            )}
          </Popup>
        </Marker>
      </MapContainer>
    </main>
  );
}

export default Geomap;
