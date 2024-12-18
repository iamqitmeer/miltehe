"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// CategorySelect Component
export function CategorySelect({ control, watch }) {
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/sub-categories"),
        ]);
        const categoriesData = await categoriesResponse.json();
        const subCategoriesData = await subCategoriesResponse.json();

        setCategories(categoriesData.categories || []);
        setAllSubCategories(subCategoriesData.subCategories || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const filterSubCategories = (categoryId) => {
    const filtered = allSubCategories.filter(
      (subCategory) => subCategory.category._id === categoryId
    );
    setFilteredSubCategories(filtered);
  };

  // Ensure that watch is a function and properly used
  const categoryValue = watch("category");

  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                filterSubCategories(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub-Category</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!categoryValue}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sub-category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map((subCategory) => (
                    <SelectItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No subcategories available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
