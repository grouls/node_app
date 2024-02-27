const express = require("express");

const adminData = require("./admin");

const products = [];

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  const hasProducts = products.length;
  res.render("shop", {
    products,
    hasProducts,
    pageTitle: "My Shop",
    productCSS: true,
    activeShop: true,
  });
});

module.exports = router;
