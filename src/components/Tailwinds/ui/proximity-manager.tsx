"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Checkbox } from "./checkbox"
import { Badge } from "./badge"
import { Plus, X } from "lucide-react"

interface ProximityManagerProps {
  proximities: string[]
  setProximities: (proximities: string[]) => void
}

export default function ProximityManager({ proximities, setProximities }: ProximityManagerProps) {
  const [newProximity, setNewProximity] = useState("")

  // Predefined common proximity options
  const commonProximities = [
    "Dekat Transportasi Umum",
    "Dekat Mall",
    "Dekat Universitas",
    "Dekat Sekolah",
    "Dekat Rumah Sakit",
    "Dekat Taman",
    "Dekat Pasar",
    "Dekat Restoran",
    "Dekat Kafe",
    "Dekat Gym",
    "Dekat Masjid",
    "Dekat Gereja",
    "Dekat Pantai",
    "Dekat Danau",
    "Dekat Gunung",
    "Dekat Area Perkantoran",
    "Dekat Pusat Kota",
    "Dekat Bandara",
    "Dekat Stasiun Kereta",
    "Dekat Halte Bus",
  ]


  const handleCommonProximityToggle = (proximity: string) => {
    if (proximities.includes(proximity)) {
      setProximities(proximities.filter((p) => p !== proximity))
    } else {
      setProximities([...proximities, proximity])
    }
  }

  const handleAddCustomProximity = () => {
    if (newProximity.trim() && !proximities.includes(newProximity.trim())) {
      setProximities([...proximities, newProximity.trim()])
      setNewProximity("")
    }
  }

  const handleRemoveProximity = (proximity: string) => {
    setProximities(proximities.filter((p) => p !== proximity))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCustomProximity()
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-300 mb-2 block">Proximities</Label>

      {/* Common Proximities */}
      <div>
        <Label className="text-xs text-gray-400 mb-2 block">Common Proximities</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto bg-[#333333] p-3 rounded-md border border-[#444444]">
          {commonProximities.map((proximity) => (
            <div key={proximity} className="flex items-center space-x-2">
              <Checkbox
                id={`proximity-${proximity}`}
                checked={proximities.includes(proximity)}
                onCheckedChange={() => handleCommonProximityToggle(proximity)}
                className="border-[#444444] data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
              />
              <Label htmlFor={`proximity-${proximity}`} className="text-gray-300 text-xs cursor-pointer">
                {proximity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Proximity */}
      <div>
        <Label className="text-xs text-gray-400 mb-2 block">Add Custom Proximity</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="e.g., Near Museum, Near Stadium, etc."
            value={newProximity}
            onChange={(e) => setNewProximity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
          />
          <Button
            type="button"
            onClick={handleAddCustomProximity}
            disabled={!newProximity.trim() || proximities.includes(newProximity.trim())}
            className="bg-blue-600 hover:bg-blue-700 px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Proximities */}
      {proximities.length > 0 && (
        <div>
          <Label className="text-xs text-gray-400 mb-2 block">Selected Proximities ({proximities.length})</Label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto bg-[#333333] p-3 rounded-md border border-[#444444]">
            {proximities.map((proximity) => (
              <Badge
                key={proximity}
                variant="secondary"
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
              >
                {proximity}
                <button
                  type="button"
                  onClick={() => handleRemoveProximity(proximity)}
                  className="ml-1 hover:bg-blue-800 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
