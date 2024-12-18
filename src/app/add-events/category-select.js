// category-select.js
"use client";
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function CategorySelect({ control, watch }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // Fetch categories and subcategories data
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
        setSubCategories(subCategoriesData.subCategories || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter sub-categories based on the selected category
  const filterSubCategories = (categoryId) => {
    const filtered = subCategories.filter(subCategory => subCategory.category._id === categoryId);
    setFilteredSubCategories(filtered);
  };

  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                filterSubCategories(value);
              }}
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
              value={field.value}
              onValueChange={field.onChange}
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
