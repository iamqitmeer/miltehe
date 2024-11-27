import connectDB from "@/lib/db/dbConnect";
import { EventModals } from "@/lib/modals/EventsModal";

export async function GET(request) {
  await connectDB();

  let events = await EventModals.find();

  return Response.json(
    {
      events,
      message: "Event Fetch Succesfully",
    },
    {
      status: 200,
    }
  );
}

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();

    // Get the request body
    const body = await request.json();

    const { name, description, startDate, endDate, location, eventImage } =
      body;

    // Validate incoming data
    if (
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      !location ||
      !eventImage
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create a new event
    const newEvent = new EventModals({
      name,
      description,
      startDate,
      endDate,
      location,
      eventImage,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Return the saved event as a response
    return new Response.json({ events: savedEvent }, { status: 201 });
  } catch (err) {
    console.error("Error creating event:", err);
    return new Response(JSON.stringify({ message: "Failed to create event" }), {
      status: 500,
    });
  }
}
