"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle, Mail, Lock, MapPin } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { auth } from "../../../../../auth";

export default async function Register() {
  const [formData, setFormData] = useState({
    profileImage: "",
    fullName: "",
    bio: "",
    email: "",
    password: "",
    location: "",
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty fields
    const emptyField = Object.keys(formData).find((key) => !formData[key]);
    if (emptyField) {
      setErrorMessage(
        `🚨 Please fill out the **${emptyField}** field before submitting!`
      );
      setIsAlertOpen(true);
      return;
    }

    console.log("Submitted Form Data:", formData);

    // Reset form fields after successful submission
    setFormData({
      profileImage: "",
      fullName: "",
      bio: "",
      email: "",
      password: "",
      location: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900">
            User Profile
          </CardTitle>
          <p className="text-sm text-zinc-500">
            Update your personal information
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileImage" className="text-zinc-700">
                Profile Image
              </Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    profileImage: e.target.files[0]?.name || "",
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-700">
                Full Name
              </Label>
              <div className="relative">
                <UserCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  required
                  className="pl-10"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-zinc-700">
                Bio
              </Label>
              <Textarea
                maxLength={120}
                id="bio"
                placeholder="Tell us about yourself (max 120 characters)"
                className="min-h-[100px] resize-none"
                value={formData.bio}
                onChange={handleChange}
              />
              <p className="text-xs text-zinc-500 text-right">
                Max 120 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-700">
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-700">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-zinc-700">
                Location
              </Label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <Input
                  id="location"
                  placeholder="Enter your location"
                  className="pl-10"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" className="hover:bg-zinc-100">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* Enhanced Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="p-6 space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600">
              Missing Fields Detected
            </AlertDialogTitle>
            <AlertDialogDescription className="text-md text-zinc-700">
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={() => setIsAlertOpen(false)}
            >
              OK, I’ll Fix It
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
