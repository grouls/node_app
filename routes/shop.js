const path = require("path");

const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { products } = adminData;

  res.render("shop", { products, pageTitle: "My Shop", path: "/" });
});

module.exports = router;
