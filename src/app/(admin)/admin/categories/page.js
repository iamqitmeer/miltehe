"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { CategoryBtn } from "@/components/custom/CategoryBtn";

function Categories() {
  const [categories, setCategories] = useState([]);

  // Fetch categories data on component mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err));
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Categories List</h2>
        <CategoryBtn onAddCategory={handleAddCategory} />
      </div>

      <Table>
        <TableCaption>A list of event categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Events</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {categories &&
    categories
      .filter((category) => category && category.createdAt) // Filter out invalid entries
      .map((category) => {
        const formattedDate = new Date(category.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        return (
          <TableRow key={category._id}>
            <TableCell className="font-medium">{category.name || "Unknown"}</TableCell>
            <TableCell>{category.description || "No description available"}</TableCell>
            <TableCell>{category.totalEvents || 0}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="icon">
                  <Trash2 />
                </Button>
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
</TableBody>

      </Table>
    </div>
  );
}

export default Categories;
