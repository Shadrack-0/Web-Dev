import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true, // e.g. "image/jpeg", "image/png", "image/webp"
    },
    size: {
      type: Number,
      required: true,
    },
    data: {
      type: Buffer, // Stored as Binary BSON buffer in MongoDB
      required: true,
    },
    category: {
      type: String,
      default: "general", // "trips", "fleet", "hotels", "gallery"
    },
    caption: {
      type: String,
      default: "",
    },
    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", ImageSchema);
