const express = require("express");
const app = express();
const userApi = require("./routes/user");
const categoryApi = require("./routes/category");
const podcastApi = require("./routes/podcast");
const cors = require("cors");
require("dotenv").config();
require("./connection/connect");
//this is for cookies and acces to connect backend and front-end
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
// all routes sbke base path same h aage k alg:-
app.use("/api/v1", userApi);
app.use("/api/v1", categoryApi);
app.use("/api/v1", podcastApi);

app.use("/uploads", express.static("uploads"));
app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
