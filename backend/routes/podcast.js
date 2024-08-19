const authMiddleWare = require("../middleware/auth");
const router = require("express").Router();
const upload = require("../middleware/multer");
const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");

// add podcast
// add the auth middleware and upload middleware
//dhyn se smjh thoda sa complex h ekdm thoda sa but u can easily understand by commentss
router.post("/add-podcast", authMiddleWare, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //   we will get the user from authMiddleware
    const { user } = req;
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res.status(400).json({ message: "No such category found" });
    }
    const catId = cat._id;
    const userId = user._id;
    //   now that we have everything needed for podcast schema create a podcast
    const newPodcast = new Podcast({
      title,
      description,
      category: catId, //because in schema category is defined by its id
      frontImage,
      audioFile,
      user: userId, //user is also defined by its id in podcast schema
    });
    //   save this podcast in database
    await newPodcast.save();
    //   now that the new podcast is created you will also have to update this in user and category schemas
    //if you see both schemas category and user has podcast as an array so u need to push this new podcasts in the podcast attribute by $push method
    await Category.findByIdAndUpdate(catId, {
      $push: { podcasts: newPodcast._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { podcasts: newPodcast._id },
    });
    //   now send response
    res.status(201).json({ message: "Podcast added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot create Podcast" });
  }
});
// get all podcast
router.get("/get-podcasts", async (req, res) => {
  try {
    //empty object so finds all and sort on basis of created at in desc.
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get podcasts made by a user
router.get("/get-user-podcasts", authMiddleWare, async (req, res) => {
  try {
    const { user } = req; //req m user ko authMiddleware laa dega
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password"); //excluding password
    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// get podcast by id
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcasts = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get podcast by categories
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;
    const categories = await Category.find({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });
    let podcasts = [];
    categories.forEach((category) => {
      podcasts = [...podcasts, ...category.podcasts];
    });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;

