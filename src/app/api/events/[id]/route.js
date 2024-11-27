import connectDB from "@/lib/db/dbConnect";
import { EventModals } from "@/lib/modals/EventsModal";

export async function GET(request, { params }) {
  const { id } = params;  // Extract 'id' from the URL

  try {
    // Connect to the database
    await connectDB();

    // Find the event by its id
    const event = await EventModals.findById(id);

    if (!event) {
      return new Response(
        JSON.stringify({ message: "Event not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",  // Ensure it's treated as JSON
          },
        }
      );
    }

    // Return the event in JSON format
    return new Response(
      JSON.stringify({ event }),  // Ensure the response body is a JSON string
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",  // Set content-type to JSON
        },
      }
    );
  } catch (err) {
    console.error('Error fetching event:', err);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch event' }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",  // Ensure JSON response
        },
      }
    );
  }
}
