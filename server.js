var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

//JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
