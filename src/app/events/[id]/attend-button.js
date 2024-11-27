import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function AttendButton({ onClick, isGoing }) {
    return (
      <Button onClick={onClick} variant={isGoing ? "default" : "outline"}>
        <Users className="mr-2 h-4 w-4" />
        {isGoing ? "Going" : "Attend"}
      </Button>
    );
  }
  