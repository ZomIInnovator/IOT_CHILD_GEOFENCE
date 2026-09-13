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
import { FaMap } from "react-icons/fa";
import { Button, message } from "antd";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useCatchLocation } from "../services/Geofence/geoQuery";
import { useUpdateLocation } from "../services/Geofence/geoMutation";

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
  //const [meters, setMeters] = useState(100);
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  const { data: loadLocation, isLoading } = useCatchLocation();
  const updateLoc = useUpdateLocation();

  const DEFAULT_EMPLOYEE_POSITION = [7.832872, 123.4483];

  useEffect(() => {
    const location = loadLocation?.[0]; // or whatever item you need

    if (location?.latitude != null && location?.longitude != null) {
      setEmployeePosition([location.latitude, location.longitude]);
    } else {
      setEmployeePosition(DEFAULT_EMPLOYEE_POSITION);
    }

    setLoading(false);
  }, [loadLocation]);

  const allowedMeters = Math.max(100 || 0, 0); //Math.max(Number(meters) || 0, 0);
  const hasRadius = allowedMeters > 0;
  const distanceFromBase = useMemo(() => {
    if (!basePosition || !employeePosition) return null;

    return getDistanceInMeters(basePosition, employeePosition);
  }, [basePosition, employeePosition]);

  const isOutsideCircle =
    distanceFromBase !== null && hasRadius && distanceFromBase > allowedMeters;

  const saveUpdate = () => {
    if (employeeId.length === 0) {
      message.error("Guardian name is required");
    } else if (contactno.length === 0) {
      message.error("Contactno is required");
    } else {
      let data = {
        phone_number: contactno,
        device_id: employeeId,
        latitude: basePosition[0].toFixed(6),
        longitude: basePosition[1].toFixed(6),
      };
      updateLoc.mutate(data, {
        onSettled: () => {
          setContactno("");
          setEmployeeId("");
        },
      });
    }
  };

  if (loading || !employeePosition) {
    return <div className="map-loading">Loading map...</div>;
  }

  if (isLoading) {
    return <div className="map-loading">Loading map...</div>;
  }

  return (
    <main className="map-page">
      {hide ? (
        <section className="map-controls" aria-label="Map controls">
          <label>
            Guardian Name
            <input
              name="employeeId"
              type="text"
              maxLength={90}
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              placeholder="Guardian Name"
            />
          </label>
          <label>
            Mobile Number
            <input
              name="contactno"
              type="tel"
              maxLength={11}
              value={contactno}
              onChange={(event) => setContactno(event.target.value)}
              placeholder="Mobile Number"
            />
          </label>
          {/* <label>
            Meters
            <input
              name="meters"
              type="number"
              min="1"
              value={meters}
              onChange={(e) => setMeters(e.target.value)}
              disabled
            />
          </label> */}
          <Button
            type="default"
            block
            onClick={() => {
              saveUpdate();
            }}
            style={{
              marginTop: "10px",
              color: "red",
              borderColor: "black",
            }}
          >
            SAVE AND UPDATES
          </Button>
          <Button
            type="default"
            block
            onClick={() => {
              setHide(false);
            }}
            style={{
              marginTop: "10px",
              color: "red",
              borderColor: "black",
            }}
          >
            HIDE
          </Button>
          <div className="base-details">
            <span>Guardian Geolocation</span>
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
      ) : (
        <section className="map-controls" aria-label="Map controls">
          <div
            className="flex items-center justify-between"
            onClick={() => setHide(true)}
          >
            <div className="flex items-center gap-2">
              <FaMap />
              <p>Geolocation Map Form</p>
            </div>
            {/* <div className="flex items-center gap-1.5 bg-red-300 py-2 px-2 rounded-2xl">
              <FaHouseUser size={15} />
              <p className="text-black text-sm">Logout</p>
            </div> */}
          </div>
        </section>
      )}

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
                Guardian Geolocation
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
            Child {employeeId || "Location"}
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
