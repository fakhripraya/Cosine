"use client"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { MapPin } from "lucide-react"
import MapPicker from "./map-picker" // Import the new MapPicker component

export interface LocationData {
  address: string
  latitude?: number
  longitude?: number
  city: string
  district: string
  subDistrict: string
  postalCode: string
}

interface LocationPickerProps {
  location: LocationData
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
}

const nominatimBaseUrl = "https://nominatim.openstreetmap.org/reverse";

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<Partial<LocationData>> => {
  try {
    const url = `${nominatimBaseUrl}?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Pintrail/1.0 (pintrail@gmail.com)", // 👈 required by Nominatim usage policy
        "Accept-Language": "id", // or "id" if you want Indonesian
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    const address = data.address || {};

    console.log(address)

    return {
      address: data.display_name || `Lat: ${lat}, Lng: ${lng}`,
      city: address.city || address.town || address.village || "",
      district: address.suburb || address.state_district || address.city_district || address.county || "",
      subDistrict: address.neighbourhood || "",
      postalCode: address.postcode || "",
    };
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return {
      address: `Unknown Location, Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
      city: "Unknown City",
      district: "Unknown District",
      subDistrict: "Unknown Sub-District",
      postalCode: "",
    };
  }
};

export default function LocationPicker({ location, setLocation }: LocationPickerProps) {

  // Default map center (Jakarta, Indonesia)
  const defaultMapCenter: [number, number] = [-6.2088, 106.8456]
  const defaultMapZoom = 13

  const handleMapLocationSelect = async (lat: number, lng: number) => {
    setLocation((prev: LocationData) => ({ ...prev, latitude: lat, longitude: lng }))
    const geocoded = await reverseGeocode(lat, lng)
    setLocation((prev) => ({
      ...prev,
      address: geocoded.address || prev.address,
      city: geocoded.city || prev.city,
      district: geocoded.district || prev.district,
      subDistrict: geocoded.subDistrict || prev.subDistrict,
      postalCode: geocoded.postalCode || prev.postalCode,
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          handleMapLocationSelect(latitude, longitude) // Use map select handler to update all fields
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enter manually or try map picker.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-300 mb-2 block">Location Details</Label>

        <div className="space-y-4">
          <div className="space-y-4">
            <MapPicker
              center={
                location.latitude && location.longitude ? [location.latitude, location.longitude] : defaultMapCenter
              }
              zoom={defaultMapZoom}
              onLocationSelect={handleMapLocationSelect}
            />
            <div className="text-xs text-gray-400 bg-[#333333] p-2 rounded">
              Selected Coordinates: {location.latitude?.toFixed(6) || "N/A"}, {location.longitude?.toFixed(6) || "N/A"}
              <br />
              Address (from map): {location.address || "N/A"}
            </div>
          </div>

          {/* Manual Address Input */}
          <div>
            <Label htmlFor="full-address" className="text-xs text-gray-400">
              Address
            </Label>
            <div className="flex gap-2">
              <Input
                id="full-address"
                type="text"
                placeholder="e.g., Jl. Kebon Jeruk No. 10, RT 01/RW 02"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
              <Button type="button" onClick={getCurrentLocation} className="bg-blue-600 hover:bg-blue-700 px-3">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Location Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-xs text-gray-400">
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="e.g., Jakarta"
                value={location.city}
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="district" className="text-xs text-gray-400">
                District
              </Label>
              <Input
                id="district"
                type="text"
                placeholder="e.g., Jakarta Barat"
                value={location.district}
                onChange={(e) => setLocation({ ...location, district: e.target.value })}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="sub-district" className="text-xs text-gray-400">
                Sub District
              </Label>
              <Input
                id="sub-district"
                type="text"
                placeholder="e.g., Kebon Jeruk"
                value={location.subDistrict}
                onChange={(e) => setLocation({ ...location, subDistrict: e.target.value })}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="postal-code" className="text-xs text-gray-400">
                Postal Code
              </Label>
              <Input
                id="postal-code"
                type="text"
                placeholder="e.g., 11530"
                value={location.postalCode}
                onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
          </div>
        </div>

      {/* Coordinates Display (always visible for debugging/info) */}
      {location.latitude && location.longitude && (
        <div className="text-xs text-gray-400 bg-[#333333] p-2 rounded">
          Current Lat/Lng: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
        </div>
      )}
    </div>
  )
}
