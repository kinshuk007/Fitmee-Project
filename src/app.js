const express=require("express");
const app= express();
// const hbs = require("hbs");
const path=require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const router=require("./routers/user");

// const port= process.env.PORT||3000;
console.log(__dirname);
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views',templatePath);
// hbs.registerPartials(partialPath);

app.use(express.static(staticPath));
app.use(router);











//jshint esversion:6


const mongoose = require('mongoose');







app.listen(3000, function() {
  console.log("Server started on port 3000");
});







