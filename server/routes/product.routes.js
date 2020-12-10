const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Product = require("../models/product.model");

router.post("/products", (req, res) => {
  const { productName, size, color,price,category,subCategory,imageUrl } = req.body;
  
  Product.create({
    productName,
    size,
    color,
    price,
    category,
    subCategory,
    imageUrl,
    seller: req.user._id, 
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


router.get("/products", (req, res) => {
  Product.find()
     .then((allTheProducts) => {
      res.status(200).json(allTheProducts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(id)
     .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Product with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `Product with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
