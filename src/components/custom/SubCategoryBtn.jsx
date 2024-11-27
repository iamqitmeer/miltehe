"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function SubCategoryBtn({ onSubCategoryAdded }) {
  const [open, setOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // Fetch available categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setAvailableCategories(data.categories || []))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subCategory.name || !subCategory.category) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/sub-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subCategory),
      });

      const data = await response.json();
      if (response.ok) {
        setSubCategory({ name: "", description: "", category: "" });
        setOpen(false);
        onSubCategoryAdded(data.subCategories); // Callback to refresh the parent list
      } else {
        alert(data.message || "Failed to add subcategory.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the subcategory.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add Sub Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new subcategory.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="subcategory-name">Name</Label>
            <Input
              id="subcategory-name"
              value={subCategory.name}
              onChange={(e) =>
                setSubCategory({ ...subCategory, name: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subcategory-description">Description</Label>
            <Input
              id="subcategory-description"
              value={subCategory.description}
              onChange={(e) =>
                setSubCategory({ ...subCategory, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subcategory-category">Parent Category</Label>
            <Select
              onValueChange={(value) =>
                setSubCategory({ ...subCategory, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Subcategory</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
