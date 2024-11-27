import React from "react";
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
import Image from "next/image";

function Events() {
  const events = [
    {
      eventName: "Tech Conference 2024",
      eventImage:
        "https://via.placeholder.com/150", // Replace with your event image URL
      eventDate: "2024-05-25",
      location: "San Francisco, USA",
      description:
        "A conference gathering the brightest minds in tech, from software developers to AI researchers. Don't miss out on the latest trends and innovations.",
      totalParticipants: 120,
      totalEventsJoined: 25,
      organizer: "TechWorld Events",
    },
    {
      eventName: "Rock Music Festival",
      eventImage:
        "https://via.placeholder.com/150", // Replace with your event image URL
      eventDate: "2024-06-15",
      location: "Los Angeles, USA",
      description:
        "Join us for a weekend filled with electrifying performances by top rock bands. Food, drinks, and an unforgettable experience await!",
      totalParticipants: 200,
      totalEventsJoined: 45,
      organizer: "RockFest Crew",
    },
    {
      eventName: "Startup Pitch Competition",
      eventImage:
        "https://via.placeholder.com/150", // Replace with your event image URL
      eventDate: "2024-07-10",
      location: "London, UK",
      description:
        "An exciting opportunity for startups to pitch their ideas to a panel of investors and win funding to take their business to the next level.",
      totalParticipants: 50,
      totalEventsJoined: 12,
      organizer: "Entrepreneur League",
    },
    {
      eventName: "Art & Culture Gala",
      eventImage:
        "https://via.placeholder.com/150", // Replace with your event image URL
      eventDate: "2024-08-05",
      location: "Paris, France",
      description:
        "An exclusive gala celebrating the finest in art and culture, featuring renowned artists, performances, and installations from across the globe.",
      totalParticipants: 80,
      totalEventsJoined: 30,
      organizer: "Cultural Events Paris",
    },
    {
      eventName: "Charity Run for Cancer Research",
      eventImage:
        "https://via.placeholder.com/150", // Replace with your event image URL
      eventDate: "2024-09-12",
      location: "New York, USA",
      description:
        "A marathon to raise awareness and funds for cancer research. Join us and support a good cause while keeping fit.",
      totalParticipants: 150,
      totalEventsJoined: 60,
      organizer: "HealthFirst Foundation",
    },
  ];

  return (
    <div className="p-6 w-full h-screen">
      <Table>
        <TableCaption>A list of upcoming events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Event Image</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Participants</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.eventName}>
              <TableCell>
                {/* <Image
                  src={event.eventImage}
                  alt={event.eventName}
                  width={24}
                  height={24}
                  className="w-24 h-24 object-cover rounded"
                /> */}
              </TableCell>
              <TableCell className="font-medium">{event.eventName}</TableCell>
              <TableCell>{event.eventDate}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.totalParticipants}</TableCell>
              <TableCell>{event.organizer}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon">
                    <Trash2 />
                  </Button>
              
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Events;
