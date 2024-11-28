"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddEventPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch sub-categories when category is selected
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      try {
        const response = await fetch(`/api/sub-category?category=${selectedCategory}`);
        const data = await response.json();
        setSubCategories(data.subCategories || []);
      } catch (error) {
        console.error("Failed to fetch sub-categories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Add tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Upload image
    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dukk4c9vd/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    const eventData = {
      name: eventName,
      description,
      location,
      startDate,
      endDate,
      capacity,
      speaker,
      tags,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      eventImage: imageUrl || "https://via.placeholder.com/150",
    };

    // Save event
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event created successfully!");
        router.push("/events");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to create event.");
      }
    } catch (error) {
      alert("An error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
        <div>
          <Label>Sub-Category</Label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select a Sub-Category
            </option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <Label>Event Name</Label>
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your event"
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Event location"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <Label>Capacity</Label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            placeholder="Number of attendees"
          />
        </div>

        {/* Speaker */}
        <div>
          <Label>Speaker</Label>
          <Input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="Enter speaker name"
          />
        </div>

        {/* Tags */}
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <Label>Event Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 max-w-sm" />}
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddEventPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all sub-categories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(`/api/sub-categories`);
        const data = await response.json();
        setSubCategories(data.subCategories || []);
      } catch (error) {
        console.error("Failed to fetch sub-categories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  // Filter sub-categories based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = subCategories.filter(
        (sub) => sub.category._id === selectedCategory
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedCategory, subCategories]);

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Add tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Upload image
    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dukk4c9vd/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    const eventData = {
      name: eventName,
      description,
      location,
      startDate,
      endDate,
      capacity,
      speaker,
      tags,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      eventImage: imageUrl || "https://via.placeholder.com/150",
    };

    // Save event
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event created successfully!");
        router.push("/events");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to create event.");
      }
    } catch (error) {
      alert("An error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
        <div>
          <Label>Sub-Category</Label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select a Sub-Category
            </option>
            {filteredSubCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Event Name</Label>
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your event"
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Event location"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <Label>Capacity</Label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            placeholder="Number of attendees"
          />
        </div>

        {/* Speaker */}
        <div>
          <Label>Speaker</Label>
          <Input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="Enter speaker name"
          />
        </div>

        {/* Tags */}
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <Label>Event Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 max-w-sm" />}
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </Button>

      </form>
    </div>
  );
}
