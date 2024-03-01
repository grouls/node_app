const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { path: "/cart", pageTitle: "Your Cart" });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("🚀 ~ productId:", productId);
  res.redirect("cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};
