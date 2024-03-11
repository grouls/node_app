const Product = require("../models/product");

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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) => {
          console.log("🚀 ~ req.user.getCart ~ err:", err);
        });
    })
    .catch((err) => {
      console.log("🚀 ~ req.user.getCart ~ err:", err);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fectchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fectchedCart = cart;
      return fectchedCart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId).catch((err) => {
        console.log("🚀 ~ returnProduct.findByPk ~ err:", err);
      });
    })
    .then((product) => {
      return fectchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("🚀 ~ req.user.getCart ~ err:", err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      return res.redirect("/cart");
    })
    .catch((err) => {
      console.log("🚀 ~ exports.postCartDeleteProduct ~ err:", err);
    });
};

exports.postOrder = (req, res, next) => {
  let fectchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fectchedCart = cart;
      return fectchedCart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => {
          console.log("🚀 ~ returnreq.user.createOrder ~ err:", err);
        });
    })
    .then(() => {
      return fectchedCart.setProducts(null);
    })
    .then(() => {
      return res.redirect("/orders");
    })
    .catch((err) => {
      console.log("🚀 ~ req.user.getCart ~ err:", err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders,
      });
    })
    .catch((err) => {
      console.log("🚀 ~ err:", err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};
