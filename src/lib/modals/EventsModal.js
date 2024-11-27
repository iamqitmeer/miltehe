import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
  eventImage: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "Users", default: null },
  going: [{ type: mongoose.Types.ObjectId, ref: "Users", default: [] }],
});

export const EventModals = mongoose.models.Event || mongoose.model("Event", eventSchema);
