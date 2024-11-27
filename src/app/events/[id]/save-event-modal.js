import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function SaveEventModal({ onClose, onSave }) {
  const [remindMe, setRemindMe] = useState(false);
  const [reminderTime, setReminderTime] = useState('1');

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Saving event with reminder:', { remindMe, reminderTime });
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Save Event</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remindMe"
              checked={remindMe}
              onCheckedChange={(checked) => setRemindMe(checked)}
            />
            <Label htmlFor="remindMe">Remind me about this event</Label>
          </div>
          {remindMe && (
            <div className="space-y-2">
              <Label htmlFor="reminderTime">Remind me</Label>
              <select
                id="reminderTime"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                <option value="0.5">30 minutes before</option>
                <option value="1">1 hour before</option>
                <option value="24">1 day before</option>
                <option value="168">1 week before</option>
              </select>
            </div>
          )}
          <Button type="submit" className="w-full">
            Save Event
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

