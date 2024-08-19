const multer = require("multer");
// set storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  // it uploads the given file in this format in uploads folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// initialize upload
const upload = multer({
  storage: storage,
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "audioFile", maxCount: 1 },
]);

module.exports = upload;
  