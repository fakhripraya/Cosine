"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../../../components/Tailwinds/ui/button"
import { Input } from "../../../../components/Tailwinds/ui/input"
import { Textarea } from "../../../../components/Tailwinds/ui/textarea"
import { Label } from "../../../../components/Tailwinds/ui/label"
import MultiUpload from "../../../../components/Tailwinds/ui/multi-upload"
import LocationPicker, { LocationData } from "../../../../components/Tailwinds/ui/location-picker"
import FacilityManager from "../../../../components/Tailwinds/ui/facility-manager"
import "../../style.css"

// Interfaces for MultiUpload component (copied from multi-upload.tsx for clarity)
interface FileWithMeta {
  name: string
  type: string
  size: number
  blob?: Blob
  base64?: string
  url?: string
}

interface RejectedFile {
  file: FileWithMeta
  errors: readonly { code: string; message: string }[]
}

export default function KostFormPage() {
  const [kostName, setKostName] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [numRooms, setNumRooms] = useState<number | "">("")
  const [description, setDescription] = useState("")
  const [facilities, setFacilities] = useState<string[]>([])
  const [location, setLocation] = useState<LocationData>({
    address: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    city: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  })

  const [files, setFiles] = useState<FileWithMeta[]>([])
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      kostName,
      location,
      price,
      numRooms,
      description,
      facilities,
      images: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url || file.base64 || URL.createObjectURL(file.blob!),
      })),
    }
    console.log("Kost Data Submitted:", formData)
    alert("Kost data submitted! Check console for details.")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="w-full max-w-3xl bg-[#2a2a2a] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Tambahkan Tempat</h1>
        <p className="text-md text-center mb-8">Bisa Tempat usahamu atau tempat favoritemu agar semua orang tau!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="kost-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Name
            </Label>
            <Input
              id="kost-name"
              type="text"
              placeholder="e.g., Kost Bahagia"
              value={kostName}
              onChange={(e) => setKostName(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          {/* Location Picker */}
          <LocationPicker location={location} setLocation={setLocation} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-gray-300 mb-2 block">
                Price (per month, IDR)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 1500000"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="num-rooms" className="text-sm font-medium text-gray-300 mb-2 block">
                Number of Rooms
              </Label>
              <Input
                id="num-rooms"
                type="number"
                placeholder="e.g., 10"
                value={numRooms}
                onChange={(e) => setNumRooms(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-300 mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the kost, including amenities, rules, and nearby facilities."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[150px] bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600 resize-y"
              required
            />
          </div>

          {/* Facility Manager */}
          <FacilityManager facilities={facilities} setFacilities={setFacilities} />

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">Upload Images</Label>
            <MultiUpload
              files={files}
              setFiles={setFiles}
              rejected={rejectedFiles}
              setRejected={setRejectedFiles}
              extensions={["image/jpeg", "image/png", "image/gif"]} // Allowed image types
              maxSize={5 * 1024 * 1024} // 5 MB
              maxLength={5} // Max 5 files
              label="Drag 'n' drop some files here, or click to select files"
              subLabel="Only .jpeg, .png, .gif images up to 5MB and 5 files max"
              formName="kost-images"
              uniqueKey="kost-upload"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-md font-semibold"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
