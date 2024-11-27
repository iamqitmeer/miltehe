"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Please enter your credentials to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-zinc-50 border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-zinc-50 border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                  size={18}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-label="Hide password" />
                  ) : (
                    <Eye size={18} aria-label="Show password" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600"
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a
            href="#"
            className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Forgot your password?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
