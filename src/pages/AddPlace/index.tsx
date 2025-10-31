"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/Tailwinds/ui/button"
import { Input } from "../../components/Tailwinds/ui/input"
import { Textarea } from "../../components/Tailwinds/ui/textarea"
import { Label } from "../../components/Tailwinds/ui/label"
import MultiUpload from "../../components/Tailwinds/ui/multi-upload"
import LocationPicker, { LocationData } from "../../components/Tailwinds/ui/location-picker"
import FacilityManager from "../../components/Tailwinds/ui/facility-manager"
import "./style.css"
import { trackPromise } from "react-promise-tracker"
import { HERMES_SERVICE } from "../../config/environment"
import { useAxios } from "../../utils/hooks/useAxios"
import { AdvanceAxiosRequestHeaders, IResponseObject } from "../../interfaces/axios"
import { URL_POST_BUILDING } from "../../config/xhr/routes/building"
import { AUTHORIZATION, CLIENT_USER_INFO, X_SID } from "../../variables/global"
import { cookies } from "../../config/cookie"
import ProximityManager from "../../components/Tailwinds/ui/proximity-manager"

// Interfaces for MultiUpload component (copied from multi-upload.tsx for clarity)
interface FileWithMeta {
  name: string
  type: string
  size: number
  blob?: Blob
  base64: string
  url?: string
}

interface RejectedFile {
  file: FileWithMeta
  errors: readonly { code: string; message: string }[]
}

export default function BusinessFormPage() {
  const axiosService = useAxios();
   const clientUserInfo = cookies.get(CLIENT_USER_INFO);

  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [businessPhone, setBusinessPhone] = useState("")
  const [businessWhatsapp, setBusinessWhatsapp] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [numRooms, setNumRooms] = useState<number | "">("")
  const [description, setDescription] = useState("")
  const [facilities, setFacilities] = useState<string[]>([])
  const [proximities, setProximities] = useState<string[]>([])
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

    // Basic field validation (you can customize as needed)
    if (!businessName || !businessType || !ownerName) {
      console.error("Missing required business information.")
      return
    }

    if (!location) {
      console.error("Location data is missing.")
      return
    }

    const { address, latitude, longitude, city, district, subDistrict, postalCode } = location

    // Handle missing address data gracefully
    const buildingAddress = [
      address || '',
      subDistrict || '',
      district || '',
      city || '',
      postalCode || ''
    ]
      .filter((val) => val && val.trim() !== '')
      .join(', ') || 'Address not provided'

    // Handle missing geolocation safely
    const buildingGeolocation = {
      latitude: latitude ?? 0, // default to 0 if undefined
      longitude: longitude ?? 0,
    }

    // Handle files safely (ensure array and valid data)
    const imageList = Array.isArray(files)
      ? files.map((file) => ({
          name: file?.name || 'unknown',
          size: file?.size || 0,
          type: file?.type || 'unknown',
          base64: file?.base64 || '',
          blob: file?.blob || null,
          url: file?.url || '',
        }))
      : []

    const formData = {
      buildingTitle: businessName,
      businessType,
      buildingDescription: description || '',
      buildingGeolocation,
      buildingAddress,
      buildingFacilities: facilities || [],
      buildingProximities: proximities || [],
      housingPrice: price || 1,
      ownerName,
      ownerEmail: businessEmail || '',
      ownerWhatsapp: businessWhatsapp || '',
      ownerPhoneNumber: businessPhone || '',
      numRooms: numRooms || 1,
      images: imageList,
    }

    // Final sanity check before sending
    if (!buildingAddress || !buildingAddress.length) {
      console.warn("Warning: Address is empty.")
    }

    if (!buildingGeolocation.latitude || !buildingGeolocation.longitude) {
      console.warn("Warning: Geolocation might be invalid.")
    }

    console.log("Submitting form data:", formData)
    handlePostBusinessForm(formData)
  }

  const handlePostBusinessForm = (data: any) => {
    const abortController = new AbortController()
    const axiosTimeout = axiosService.setAxiosTimeout(abortController)

    trackPromise(
      axiosService
        .postData({
          headers: {
            [AUTHORIZATION]:
              `Bearer ${clientUserInfo.credentialToken.accessToken}` ||
              "",
            [X_SID]: clientUserInfo.sid || "",
          } as unknown as AdvanceAxiosRequestHeaders,
          endpoint: HERMES_SERVICE,
          url: URL_POST_BUILDING,   
          controller: abortController,
          data,              
        })
        .then(async (_: IResponseObject) => {
          alert("Submitted successfully!");
        })
        .catch((error: IResponseObject) => {
          console.error("Failed to submit business:", error)
          alert(error.responseError);
        })
        .finally(() => clearTimeout(axiosTimeout))
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="w-full max-w-3xl bg-[#2a2a2a] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Tambahkan Tempat Usahamu</h1>
        <p className="text-md text-center mb-8">Bisa Tempat usahamu atau tempat favoritemu agar semua orang tau!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Business Name
            </Label>
            <Input
              id="business-name"
              type="text"
              placeholder="e.g., Kost Bahagia / Cafe Merah Delima / Co-Working Space XYZ"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="business-type" className="text-sm font-medium text-gray-300 mb-2 block">
              Business Type
            </Label>
            <select
              id="business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 
                        focus:ring-green-600 focus:border-green-600 rounded-md p-2"
              required
            >
              <option value="" disabled>
                -- Select Business Type --
              </option>
              <option value="Hotel">Hotel</option>
              <option value="Boarding House">Boarding House</option>
              <option value="F&B">F&B</option>
              <option value="Co-working">Co-working</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Owner
            </Label>
            <Input
              id="business-owner"
              type="text"
              placeholder="e.g., Supri"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Phone Number
            </Label>
            <Input
              id="business-phone"
              type="text"
              placeholder="e.g., 081234567890"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Whatsapp
            </Label>
            <Input
              id="business-whatsapp"
              type="text"
              placeholder="e.g., 081234567890"
              value={businessWhatsapp}
              onChange={(e) => setBusinessWhatsapp(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-300 mb-2 block">
              Email
            </Label>
            <Input
              id="business-email"
              type="text"
              placeholder="e.g., kostbahagia@gmail.com"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              className="w-full bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
              required
            />
          </div>

          {/* Location Picker */}
          <LocationPicker location={location} setLocation={setLocation} />

          {
            (businessType === "Boarding House" || businessType === "Hotel") && (
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
                {businessType === "Boarding House" && (
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
                )}
              </div>
            )
          }

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-300 mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the business, including amenities, rules, and nearby facilities."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[150px] bg-[#333333] border border-[#444444] text-white placeholder-gray-500 focus:ring-green-600 focus:border-green-600 resize-y"
              required
            />
          </div>

          {/* Facility Manager */}
          <FacilityManager facilities={facilities} setFacilities={setFacilities} />
          <ProximityManager proximities={proximities} setProximities={setProximities} />

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
              formName="business-images"
              uniqueKey="business-upload"
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
