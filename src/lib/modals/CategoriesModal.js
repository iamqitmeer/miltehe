import mongoose from "mongoose";
const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    totalEvents: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const CategoriesModal =
  mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);
