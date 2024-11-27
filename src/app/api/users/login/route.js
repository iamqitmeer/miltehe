import connectDB from "@/lib/db/dbConnect";
import UserModal from "@/lib/modals/UserModal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await connectDB();

  let users = await UserModal.find();

  return Response.json({
    users: users,
    status: 200,
    message: "Users Fetch Succesfully",
  });
}

// Login Work

export async function POST(request) {
  await connectDB();

  let obj = await request.json();

  // Check user email is alreay signin

  let isUserExist = await UserModal.findOne({ email: obj.email });
  if (!isUserExist) {
    return Response.json(
      { error: true, message: "User Email not found" },
      { status: 403 }
    );
  }

  // convert hash in to valid password & Compare user password

  let isPassValid = await bcrypt.compare(obj.password, isUserExist.password);
  if (!isPassValid) {
    return Response.json(
      {
        error: true,
        message: "User Password not found",
      },
      {
        status: 403,
      }
    );
  }

  // Generate created User Secret Token with JWT
  var token = jwt.sign(
    { id: isUserExist._id, role: isUserExist.role },
    process.env.MY_JWT_PRVT_KEY
  );

  return Response.json(
    {
      user: isUserExist,
      message: "User Login Succesfully",
      token,
    },
    {
      status: 201,
    }
  );
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookmarkIcon } from "lucide-react"

export default function SaveButton({ eventId }) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/event/${eventId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ saved: !isSaved })
      })

      if (response.ok) {
        setIsSaved(!isSaved)
      }
    } catch (error) {
      console.error("Error updating save status:", error)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button onClick={handleSaveClick} variant="outline">
        <BookmarkIcon
          className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`}
        />
        {isSaved ? "Saved" : "Save"}
      </Button>
    </motion.div>
  )
}
