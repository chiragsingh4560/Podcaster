import express from "express";
import userApi from "./routes/user.js";
import categoryApi from "./routes/category.js";
import podcastApi from "./routes/podcast.js";
import cors from "cors";
import dotenv from "dotenv";
import "./connection/connect.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(
  cors({
   origin: [
      "http://localhost:5174", // For local frontend
     "https://podcaster-frontend-seven.vercel.app"  // For main frontend domains
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Define the base path for your routes
app.use("/api/v1", userApi);
app.use("/api/v1", categoryApi);
app.use("/api/v1", podcastApi);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// A simple GET route to display a success message
app.get("/", (req, res) => {
  res.send(
    `Backend deployed successfully! Frontend URL: ${process.env.FRONTEND_URL}`
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
// Export the app for Vercel to handle
export default app;
