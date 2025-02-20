import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import cloudinary from "./middleware/cloudinary.js";
import Podcast from "./models/podcast.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to upload a file to Cloudinary
async function uploadFileToCloudinary(filePath, folder) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: filePath.endsWith(".mp3") ? "video" : "image",
    });
    return result.secure_url; // Cloudinary URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
}

// Function to update all podcast documents
async function updatePodcasts() {
  try {
    const podcasts = await Podcast.find({}); // Fetch all podcasts
    for (let podcast of podcasts) {
      console.log(`Processing podcast: ${podcast.title}`);

      // Convert file paths from Windows-style (uploads\\file.jpg) to Unix-style (uploads/file.jpg)
      const imagePath = podcast.frontImage.replace(/\\/g, "/");
      const audioPath = podcast.audioFile.replace(/\\/g, "/");

      // Upload image and audio to Cloudinary
      const newImageURL = await uploadFileToCloudinary(imagePath, "podcasts/images");
      const newAudioURL = await uploadFileToCloudinary(audioPath, "podcasts/audio");

      // Update podcast with new Cloudinary URLs
      if (newImageURL) podcast.frontImage = newImageURL;
      if (newAudioURL) podcast.audioFile = newAudioURL;

      await podcast.save(); // Save updated document
      console.log(`Updated ${podcast.title} ✅`);
    }
    
    console.log("All podcasts updated successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating database:", error);
    mongoose.connection.close();
  }
}

// Run the update process
updatePodcasts();
