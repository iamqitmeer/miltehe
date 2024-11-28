import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  speaker: { type: String, required: true },
  capacity: { type: Number, required: true },
  tags: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
  eventImage: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", default: [] }],
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
