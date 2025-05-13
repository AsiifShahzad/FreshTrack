const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

const router = express.Router();

// Create a new product
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      userId: req.user.id, // Ensure this matches your schema
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: err.message });
  }
});

// Read (all products for this user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Update a product by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Delete a product by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
