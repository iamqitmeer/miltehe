import mongoose from "mongoose";
const { Schema } = mongoose;

const subCategoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    totalEvents: { type: Number, default: 0 }, // Default value set to 0
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubCategoriesModal =
  mongoose.models.SubCategories ||
  mongoose.model("SubCategories", subCategoriesSchema);
