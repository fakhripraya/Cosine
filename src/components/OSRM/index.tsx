import React, { useEffect } from 'react';
import { Coordinate } from '../../interfaces/geo';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

interface OSRMRoutingProps {
  start: Coordinate;
  end: Coordinate;
}

export const OSRMRouting: React.FC<OSRMRoutingProps> = ({ start, end }: OSRMRoutingProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create a routing control with OSRM as the routing service
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng), // Starting point
        L.latLng(end.lat, end.lng), // Destination point
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1', // OSRM public API
      }),
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
    }).addTo(map);

    // Cleanup routing control on component unmount
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};
