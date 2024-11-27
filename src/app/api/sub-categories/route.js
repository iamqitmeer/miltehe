import connectDB from "@/lib/db/dbConnect";
import { SubCategoriesModal } from "@/lib/modals/SubCategoriesModal";

export async function GET(request) {
  await connectDB();

  let reqUrl = request.url;

  const { searchParams } = new URL(reqUrl);

  let query = {};

  console.log("searchParams.get - category --->", searchParams.get("category"));

  if (searchParams.get("category")) {
    query.category = searchParams.get("category");
  }

  let subCategories = await SubCategoriesModal.find(query).populate(
    "category",
    "name"
  );

  return Response.json({
    subCategories,
    status: 200,
    message: "Sub Categories Fetch Succesfully",
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const sub_category = await request.json();

    // Ensure totalEvents defaults to 0 if not provided
    sub_category.totalEvents = sub_category.totalEvents || 0;

    // Validate required fields
    if (!sub_category.name || !sub_category.description || !sub_category.category) {
      return Response.json(
        {
          message: "Required fields: name, description, and category.",
        },
        { status: 400 }
      );
    }

    const newSubCategory = new SubCategoriesModal(sub_category);

    await newSubCategory.save();

    return Response.json(
      {
        message: "Sub Category added successfully",
        subCategory: newSubCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving subcategory:", error);
    return Response.json(
      {
        message: "Failed to add subcategory",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { message: "Subcategory ID is required." },
        { status: 400 }
      );
    }

    await SubCategoriesModal.findByIdAndDelete(id);

    return Response.json(
      { message: "Subcategory deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return Response.json(
      { message: "Failed to delete subcategory.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { id, ...updatedData } = await request.json();

    console.log("Received ID:", id); // Debug log
    console.log("Updated Data:", updatedData); // Debug log

    if (!id) {
      return Response.json(
        { message: "Subcategory ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedSubCategory = await SubCategoriesModal.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedSubCategory) {
      return Response.json(
        { message: "Subcategory not found." },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Subcategory updated successfully.", subCategory: updatedSubCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return Response.json(
      { message: "Failed to update subcategory.", error: error.message },
      { status: 500 }
    );
  }
}

