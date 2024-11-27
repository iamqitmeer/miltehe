import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    bio: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    location: { type: String, required: false },
    totalEventAdded: { type: Number, default: 0 },
    totalEventJoined: { type: Number, default: 0 },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModal = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModal;
