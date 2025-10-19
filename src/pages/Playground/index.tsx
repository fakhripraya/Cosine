import React, { useState } from "react";
import "./style.scss";
import { LeafletMap } from "../../components/OSRM";

// Mock conversation with embedded map response for Jakarta location with directions
const mockMessages = [
  {
    id: "1",
    role: "assistant",
    content:
      "I've found directions from your starting point (-6.2617816,106.6278774) to the destination (-6.2655385,106.7581004) in Jakarta, Indonesia. Here's an interactive map showing the route:",
    timestamp: "10:32 AM",
    mapData: {
      origin: {
        latitude: -6.2618446,
        longitude: 106.7720192,
        name: "Starting Point",
      },
      destination: {
        latitude: -6.2655385,
        longitude: 106.7581004,
        name: "Destination",
      },
    },
  },
]

const Playground: React.FC = () => {
  const [messages] = useState(mockMessages)

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          {message.role === "assistant" && "mapData" in message && (
            <div style={{width: "auto", margin: "8px"}} className="mt-4 bg-white rounded-md overflow-hidden border shadow-md">
              <LeafletMap
                origin={message.mapData.origin}
                destination={message.mapData.destination}
                height="400px"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Playground;
