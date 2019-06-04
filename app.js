// eshint jsversion: 6

// declare required packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

// declare uses and sets
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// app gets, posts, listens
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/gameplay", function(req, res) {
  res.render("gameplay");
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
