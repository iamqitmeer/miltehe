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

export async function POST(request) {
  await connectDB();

  let obj = await request.json();

  // Check if the user with this email already exists
  let isUserExist = await UserModal.findOne({ email: obj.email });
  if (isUserExist) {
    return Response.json({
      error: true,
      message: "User with this email already exists",
      status: 403,
    });
  }

  // Hash the user's password with bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
  obj.password = hashedPassword;

  // Create the user
  let addUserToDB = new UserModal(obj);
  await addUserToDB.save();

  // Generate a token for the created user
  var token = jwt.sign(
    { id: addUserToDB._id, role: addUserToDB.role },
    process.env.MY_JWT_PRVT_KEY
  );

  // Return the newly created user including timestamps
  return Response.json(
    {
      user: addUserToDB, // Includes timestamps by default
      message: "User added successfully",
      token,
    },
    {
      status: 201,
    }
  );
}

