const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "../../config.env" }); //this must be placed before app
const loginRoute = require("./routes/loginRoute");
const viewRouter = require("./routes/viewRoutes");

const app = express();

// this parses the Cookie header in the HTTP request and makes the cookies available in the req.cookies object.
app.use(cookieParser());

app.set("view engine", "pug"); // register view engine
app.set("views", path.join(__dirname, "views")); // tell view engine where to look
// Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, "public")));
// Set Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(), // Optional
        "script-src": ["'self'", "https://unpkg.com"],
      },
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Prevents denial of service and brute force attacks
// Limits request form the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requuests from this IP, please try again later",
});

app.use("/api", limiter);

// Body Parser, reading data from the body into req.body
app.use(express.json({ limit: "10Kb" }));

// Data sanitisation against NoSQL query injection
app.use(mongoSanitize()); // remove mongoDB operators

// Data sanitisation against XSS
app.use(xss());

// Prevent Params pollution ?
// white list allows duplication of selected params
app.use(
  hpp({
    whitelist: ["duration", "difficulty"],
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Test Middleware

app.use((req, res, next) => {
  req, (requestTime = new Date().toISOString());
  console.log(req.cookies);
  next();
});

// Mounting Routes
app.use("/", viewRouter);
app.use("/api/v1/users", loginRoute);

// Handles the 404 page, middleware should be the last/bottom middleware
// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });

module.exports = app;
