"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import { Navigation, Clock, Loader2 } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

interface Location {
  latitude: number
  longitude: number
  name?: string
}

interface LeafletMapProps {
  origin: Location
  destination?: Location
  height?: string
}

interface RouteData {
  coordinates: [number, number][]
  distance: number
  duration: number
  loading: boolean
  error: string | null
}

// Component to automatically set the view to show both markers
function SetViewToBounds({
  origin,
  destination,
  routeCoordinates,
}: {
  origin: Location
  destination?: Location
  routeCoordinates: [number, number][]
}) {
  const map = useMap()

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      // If we have route coordinates, fit bounds to the route
      const bounds = L.latLngBounds(routeCoordinates.map((coord) => [coord[1], coord[0]]))
      map.fitBounds(bounds, { padding: [50, 50] })
    } else if (destination) {
      // If we have both points but no route yet, fit bounds to show both points
      const bounds = L.latLngBounds([origin.latitude, origin.longitude], [destination.latitude, destination.longitude])
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      // If we only have origin, center on it
      map.setView([origin.latitude, origin.longitude], 15)
    }
  }, [map, origin, destination, routeCoordinates])

  return null
}

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export function LeafletMap({ origin, destination, height = "400px" }: LeafletMapProps) {
  const [originIcon, setOriginIcon] = useState<L.DivIcon | null>(null)
  const [destinationIcon, setDestinationIcon] = useState<L.DivIcon | null>(null)
  const [route, setRoute] = useState<RouteData>({
    coordinates: [],
    distance: 0,
    duration: 0,
    loading: false,
    error: null,
  })

  // Fetch route data from OSRM
  const fetchRoute = async (origin: Location, destination: Location) => {
    setRoute((prev) => ({ ...prev, loading: true, error: null }))

    try {
      // Use OSRM's API to get a route that follows roads
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch route: ${response.status}`)
      }

      const data = await response.json()

      if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
        throw new Error("No route found")
      }

      const route = data.routes[0]
      console.log(route)
      const coordinates = route.geometry.coordinates as [number, number][]
      const distance = (route.distance / 1609.34).toFixed(1) // Convert meters to miles
      const duration = Math.round(route.duration / 60) // Convert seconds to minutes

      setRoute({
        coordinates,
        distance: Number.parseFloat(distance),
        duration,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error("Error fetching route:", error)
      setRoute((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch route",
      }))
    }
  }

  useEffect(() => {
    // Fix for Leaflet marker icons in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })

    // Create custom icons
    setOriginIcon(createCustomIcon("#22c55e")) // Green for origin
    setDestinationIcon(createCustomIcon("#ef4444")) // Red for destination
  }, [])

  // Fetch route when origin or destination changes
  useEffect(() => {
    if (destination) {
      fetchRoute(origin, destination)
    }
  }, [origin, destination])

  // Default center if no points provided
  const defaultCenter: [number, number] = [-6.2, 106.7]

  return (
    <div className="w-full dark-bg-color p-3">
      <div style={{ height, width: "100%" }}>
        {/* Only render the map on the client side */}
        <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Origin marker */}
          {originIcon && (
            <Marker position={[origin.latitude, origin.longitude]} icon={originIcon}>
              <Popup>
                <strong>{origin.name || "Origin"}</strong>
                <br />
                {origin.latitude.toFixed(6)}, {origin.longitude.toFixed(6)}
              </Popup>
            </Marker>
          )}

          {/* Destination marker */}
          {destination && destinationIcon && (
            <Marker position={[destination.latitude, destination.longitude]} icon={destinationIcon}>
              <Popup>
                <strong>{destination.name || "Destination"}</strong>
                <br />
                {destination.latitude.toFixed(6)}, {destination.longitude.toFixed(6)}
              </Popup>
            </Marker>
          )}

          {/* Route line that follows roads */}
          {destination && route.coordinates.length > 0 && (
            <Polyline
              positions={route.coordinates.map((coord) => [coord[1], coord[0]])} // Swap lat/lng for Leaflet
              color="#3b82f6"
              weight={4}
              opacity={0.7}
            />
          )}

          {/* Set view to show all markers and route */}
          <SetViewToBounds origin={origin} destination={destination} routeCoordinates={route.coordinates} />
        </MapContainer>
      </div>
      <div className="p-2">
        <h3 className="font-medium">{destination ? "Directions" : "Location"}</h3>
        <p className="font-small">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, deleniti quidem minus incidunt libero neque quos mollitia et iste tempore officia dolore rem nostrum? Autem sint veritatis non! Excepturi, ab.</p>
        {destination && (
          <div style={{marginBottom: "8px"}}>
            {route.loading ? (
              <>
                <span className="mx-2">•</span>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="ml-1 text-xs">Calculating route...</span>
              </>
            ) : (
              <>
                <div className="breakline" />
                <Clock style={{marginRight: "8px"}} />
                <span>{route.duration} minute</span>
                <div className="breakline" />
                <Navigation style={{marginRight: "8px"}} />
                <span>{route.distance} Kilometer</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
