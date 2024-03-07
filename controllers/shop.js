const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ Product.findAll ~ err:", err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ Product.findAll ~ err:", err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findAll({ where: { id: productId } })
    .then((product) => {
      res.render("shop/product-list", {
        products: product,
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ Product.findAll ~ err:", err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll((cartItems) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cartItems.products.find(
          (p) => p.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};
