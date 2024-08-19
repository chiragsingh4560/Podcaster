const mongoose = require("mongoose");

const podcast = new mongoose.Schema(
  {
    //thumbnail
    frontImage: {
      type: String,
      unique: true,
      required: true,
    },
    //we will push the url so type string
    audioFile: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      unique: true,
      required: true,
    },
    // a podcast will belong to only category and created by only one user so here it will not be an array
    //this user is the one who created this podcast
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("podcast", podcast);
