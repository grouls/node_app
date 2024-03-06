const fs = require("fs");
const path = require("path");

const readFromFile = require("../util/readFromFile");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("🚀 ~ Cart ~ fs.writeFile ~ err:", err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((product) => product.id === id);
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      if (!product) {
        return;
      }
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * product.qty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log("🚀 ~ Cart ~ fs.writeFile ~ err:", err);
      });
    });
  }

  static fetchAll(callback) {
    readFromFile("data", "cart.json", callback);
  }
};
