const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/loginRoute");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "../../config.env" }); //this must be placed before app
const app = express();
app.set("view engine", "ejs"); // register view engine
app.set("views", path.join(__dirname, "/views")); // tell view engine where to look

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Gives access to all the files in the publlic folder and not just the htmml being send.
// Does the file matching.
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/users", loginRoute);

// Handles the 404 page, middleware should be the last/bottom middleware
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = app;
