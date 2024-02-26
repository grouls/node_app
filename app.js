import express from "express";

const app = express();

app.use("/users", (req, res, next) => {
  res.send("<h1>Hello Users!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("this always runs!");
  res.send("<h1>Hello World!</h1>");
});

app.listen(3000);
