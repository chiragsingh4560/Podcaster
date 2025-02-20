import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // Import pre-configured Cloudinary

// Define Storage Using Imported Cloudinary Instance
const storage = new CloudinaryStorage({
  cloudinary, // Using the imported Cloudinary instance
  params: async (req, file) => {
    console.log(
      `📁 Uploading file: ${file.originalname}, Type: ${file.mimetype}`
    );
    return {
      folder: "podcasts",
      resource_type: file.mimetype.startsWith("audio") ? "video" : "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\s/g, "-")}`,
    };
  },
});

// Multer Upload Middleware
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.startsWith("image") &&
      !file.mimetype.startsWith("audio")
    ) {
      return cb(new Error("Only image and audio files are allowed"));
    }
    cb(null, true);
  },
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "audioFile", maxCount: 1 },
]);

// Middleware Wrapper for Error Handling
export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("🚨 Multer Error:", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
