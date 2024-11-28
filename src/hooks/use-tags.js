import { useState } from "react"

export function useTags(initialTags = []) {
  const [tags, setTags] = useState(initialTags)

  const addTag = tag => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return { tags, addTag, removeTag, setTags }
}
