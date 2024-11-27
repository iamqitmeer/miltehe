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
import { SubCategoryBtn } from "@/components/custom/SubCategoryBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = () => {
    fetch("/api/sub-categories")
      .then((res) => res.json())
      .then((data) => setSubCategories(data.subCategories))
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch subcategories.",
          variant: "destructive",
        });
      });
  };

  const handleSubCategoryAdded = () => {
    fetchSubCategories();
    toast({
      title: "Success",
      description: "Subcategory added successfully!",
      variant: "default",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      const response = await fetch("/api/sub-categories", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSubCategories((prev) =>
          prev.filter((subCategory) => subCategory._id !== id)
        );
        toast({
          title: "Success",
          description: "Subcategory deleted successfully!",
          variant: "default",
        });
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Failed to delete subcategory.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the subcategory.",
        variant: "destructive",
      });
    }
  };

  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (subCategory) => {
    setEditData(subCategory);
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/sub-categories", {
        method: "PATCH",
        body: JSON.stringify({
          id: editData._id,
          ...editData,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const { subCategory } = await response.json();
        setSubCategories((prev) =>
          prev.map((item) => (item._id === subCategory._id ? subCategory : item))
        );
        setIsEditOpen(false);
        toast({
          title: "Success",
          description: "Subcategory updated successfully!",
          variant: "default",
        });
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Failed to update subcategory.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the subcategory.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Subcategories List
        </h2>
        <SubCategoryBtn onSubCategoryAdded={handleSubCategoryAdded} />
      </div>

      <Table>
        <TableCaption>A list of event subcategories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subcategory Name</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Events</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategories.map((subCategory) => {
            const formattedDate = new Date(
              subCategory.createdAt
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            return (
              <TableRow key={subCategory._id}>
                <TableCell className="font-medium">
                  {subCategory.name}
                </TableCell>
                <TableCell>{subCategory.category.name}</TableCell>
                <TableCell>{subCategory.description}</TableCell>
                <TableCell>{subCategory.totalEvents}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(subCategory._id)}
                    >
                      <Trash2 />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(subCategory)}
                    >
                      <Pencil />
                    </Button>

                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Subcategory</DialogTitle>
                          <DialogDescription>
                            Update the subcategory details.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate();
                          }}
                        >
                          <div className="grid gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={editData?.name || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />

                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={editData?.description || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />

                            <Label htmlFor="category">Parent Category</Label>
                            <Input
                              id="category"
                              value={editData?.category.name || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  category: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <Button type="submit" className="mt-4">
                            Update
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
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

export default SubCategories;
