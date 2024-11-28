import connectDB from "@/lib/db/dbConnect";
import Event from "@/lib/models/Event";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";

export async function GET(req) {
  await connectDB();

  try {
    const events = await Event.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("creator", "name email");
    return Response.json({ events }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to fetch events", error }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const {
      name,
      description,
      startDate,
      endDate,
      location,
      speaker,
      capacity,
      tags,
      category,
      subCategory,
      eventImage,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      !location ||
      !speaker ||
      !capacity ||
      !category ||
      !subCategory ||
      !eventImage
    ) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    // Validate category and subCategory
    const categoryExists = await Category.findById(category);
    const subCategoryExists = await SubCategory.findById(subCategory);

    if (!categoryExists || !subCategoryExists) {
      return Response.json({ message: "Invalid category or sub-category" }, { status: 400 });
    }

    // Create new event
    const newEvent = new Event({
      name,
      description,
      startDate,
      endDate,
      location,
      speaker,
      capacity,
      tags,
      category,
      subCategory,
      eventImage,
    });

    const savedEvent = await newEvent.save();
    return Response.json({ event: savedEvent }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Failed to create event", error }, { status: 500 });
  }
}
