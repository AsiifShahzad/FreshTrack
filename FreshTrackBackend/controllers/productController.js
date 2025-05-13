const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { name, category, expiryDate, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name,
      category,
      expiryDate,
      imageUrl,
      user: req.user.id
    });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
