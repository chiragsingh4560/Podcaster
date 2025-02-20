// Create your router
import { Router } from "express";
import category from "../models/category.js";

const router = Router();

// add-category
router.post("/add-category", async (req, res) => {
  const { categoryName } = req.body;
  const cat = new category({ categoryName });
  await cat.save();
  return res.status(200).json({ message: "Category created" });
});
export default router;
