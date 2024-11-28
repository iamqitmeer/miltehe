"use client"
import { useState } from "react"
import { ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

export function ImageUpload({ control }) {
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = async (e, onChange) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.")
        return
      }

      setImagePreview(URL.createObjectURL(file))

      // Upload image to Cloudinary
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "ml_default")

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dukk4c9vd/image/upload`,
          { method: "POST", body: formData }
        )

        const data = await response.json()
        onChange(data.secure_url)
      } catch (error) {
        console.error("Image upload failed:", error)
        alert("Image upload failed.")
      }
    }
  }

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Event Image</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-20 w-20"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-8 w-8" />
                )}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleImageChange(e, field.onChange)}
              />
              <div className="text-sm text-muted-foreground">
                Click to upload an image (max 5MB)
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
