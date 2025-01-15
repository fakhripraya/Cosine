import React, { useEffect, useState } from "react";
import L from 'leaflet';
import "./style.scss";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine';
import { OSRMRouting } from "../../components/OSRM";
import { Coordinate } from "../../interfaces/geo";

const Playground: React.FC = () => {
  const [start, setStart] = useState<Coordinate | null>(null);
  const [end, setEnd] = useState<Coordinate | null>(null);

  useEffect(() => {
    // Fetch coordinates from your backend
    const fetchCoordinates = async () => {
      try {
        // Replace with your actual backend endpoint
        const response = await fetch("/api/coordinates");
        const data = await response.json();

        // Assuming API response is in the format: { start: { lat, lng }, end: { lat, lng } }
        setStart(data.start);
        setEnd(data.end);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  // Show a loading message until coordinates are available
  if (!start || !end) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={start}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <OSRMRouting start={start} end={end} />
      </MapContainer>
    </div>
  );
};

export default Playground;
