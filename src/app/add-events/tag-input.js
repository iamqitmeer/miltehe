"use client"
import { useState } from "react"
import { useFieldArray } from "react-hook-form"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

export function TagInput({ control }) {
  const [tagInput, setTagInput] = useState("")
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control
  })

  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      !fields.some(field => field.value === tagInput.trim())
    ) {
      append(tagInput.trim())
      setTagInput("")
    }
  }

  return (
    <FormField
      control={control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    <span>{field.value}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-secondary-foreground"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
