const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    // a user can create multiple podcasts so here podcasts will be an array
    podcasts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "podcast",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
