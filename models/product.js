const fs = require("fs");
const path = require("path");

const readFromFile = require("../util/readFromFile");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // Not actually unique but will do for now
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        err && console.log("🚀 ~ Product ~ fs.writeFile ~err:", err);
      });
    });
  }

  static fetchAll(callback) {
    readFromFile("data", "products.json", callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }
};
