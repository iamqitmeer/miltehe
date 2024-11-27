"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);

  // Fetch users data on component mount
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 w-full h-screen">
      <Table>
        <TableCaption>A list of your all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Join Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Total Events Added</TableHead>
            <TableHead>Total Events Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => {
              const formattedDate = new Date(user.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              );

              return (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.bio}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.totalEventAdded}</TableCell>
                  <TableCell>{user.totalEventJoined}</TableCell>
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

export default Users;
