const mongoose = require("mongoose");

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

module.exports = mongoose.model("category", category);
