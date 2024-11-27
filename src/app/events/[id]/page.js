"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "./share-modal";
import SaveEventModal from "./save-event-modal";
import AttendButton from "./attend-button";
import { UserDetailsDrawer } from "./user-details-modal";

async function getEvent(id) {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

async function getRelatedEvents() {
  const res = await fetch("http://localhost:3000/api/events?limit=3");
  if (!res.ok) throw new Error("Failed to fetch related events");
  return res.json();
}

export default function EventPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isGoing, setIsGoing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUserDetailsDrawer, setShowUserDetailsDrawer] = useState(false);
  const [showSaveEventModal, setShowSaveEventModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      getEvent(params.id)
        .then((data) => setEvent(data.event))
        .catch((err) => console.error("Error fetching event:", err));

      getRelatedEvents()
        .then((data) => setRelatedEvents(data.events))
        .catch((err) => console.error("Error fetching related events:", err));
    }
  }, [params.id]);

  const handleGoingClick = () => {
    if (!isGoing) {
      setShowUserDetailsDrawer(true); // Open the drawer
    } else {
      setIsGoing(false);
      toast({
        title: "You're no longer attending",
        description: "You've been removed from the attendee list.",
        variant: "default",
      });
    }
  };

  const handleSaveClick = () => {
    if (!isSaved) {
      setShowSaveEventModal(true);
    } else {
      setIsSaved(false);
      toast({
        title: "Event removed from saved",
        description: "The event has been removed from your saved list.",
        variant: "default",
      });
    }
  };

  const handleShareClick = () => setShowShareModal(true);

  if (!event)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={event.eventImage || "/placeholder-event.jpg"}
                  alt={event.name}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
                    {event.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {new Date(event.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{event.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarImage src={event.creatorImage} />
                    <AvatarFallback>{event.creatorName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">Created by {event.creatorName}</p>
                    <p className="text-sm text-muted-foreground">Event Organizer</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarImage src={event.speakerImage} />
                    <AvatarFallback>{event.speakerName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{event.speakerName}</p>
                    <p className="text-sm text-muted-foreground">Main Speaker</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <AttendButton onClick={handleGoingClick} isGoing={isGoing} />
                  <Button
                    onClick={handleSaveClick}
                    variant={isSaved ? "default" : "outline"}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button onClick={handleShareClick} variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Related Events
              </h2>
              <div className="space-y-4">
                {relatedEvents.map((relatedEvent, index) => (
                  <motion.div
                    key={relatedEvent._id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Link href={`/events/${relatedEvent._id}`}>
                      <div className="flex items-center gap-4 group hover:bg-accent rounded-lg p-2 transition-all duration-200">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={relatedEvent.eventImage || "/placeholder-event.jpg"}
                            alt={relatedEvent.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {relatedEvent.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(relatedEvent.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
        {showUserDetailsDrawer && (
          <UserDetailsDrawer
            open={showUserDetailsDrawer} // Correct prop for controlling visibility
            onClose={() => setShowUserDetailsDrawer(false)}
            onSubmit={() => {
              setIsGoing(true); // Make sure to update isGoing after drawer closes
              setShowUserDetailsDrawer(false);
              toast({
                title: "You're attending!",
                description: "You've been added to the attendee list.",
                variant: "default",
              });
            }}
          />
        )}
        {showSaveEventModal && <SaveEventModal onClose={() => setShowSaveEventModal(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
