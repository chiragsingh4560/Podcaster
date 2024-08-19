const router = require("express").Router();
const category = require("../models/category");
// add-category
router.post("/add-category", async (req, res) => {
  const { categoryName } = req.body;
  const cat = new category({ categoryName });
  await cat.save();
  return res.status(200).json({ message: "Category created" });
});
module.exports = router;
