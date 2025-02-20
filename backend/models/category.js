import mongoose from "mongoose";

const category = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
    },
    // in a category there can be multiple podcasts so it will be an array
    podcasts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "podcast",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("category", category);
