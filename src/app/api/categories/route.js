import connectDB from "@/lib/db/dbConnect";
import { CategoriesModal } from "@/lib/modals/CategoriesModal";

export async function GET(request) {
  await connectDB();

  let categories = await CategoriesModal.find();

  return Response.json({
    categories,
    status: 200,
    message: "Categories Fetch Succesfully",
  });
}


export async function POST(request) {
  // Connect to the database cinnectDB
  await connectDB();

  // Parse incoming JSON request body
  const obj = await request.json();

  console.log("Data AaaaaGaya ------>", obj);

  try {
    // Create new category using the Mongoose model
    let addDataToDB = new CategoriesModal(obj);

    // Save data to the database
    await addDataToDB.save();

    console.log("Data DB me Add Ho Gaya ------>", addDataToDB);

    // Return success response
    return new Response.json(
      {
        categories: addDataToDB,
        message: "Category added successfully",
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding category:", error);

    // Return error response
    return new Response.json(
      {
        message: "Failed to add category",
        error: error.message,
      },
      {
        status: 500,
        "Content-Type": "application/json",
      }
    );
  }
}