const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

const square = require("./square");

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./index.html", function (error, data) {
    res.write("The area of a square with a width of 4 is " + square.area(4));
    if (error) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
