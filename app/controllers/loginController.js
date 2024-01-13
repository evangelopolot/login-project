const path = require("path");
const User = require("../../models/userModel");

exports.homepage = (req, res) => {
  res.render("signIn", { title: "Sign In" });
};

exports.signIn = (req, res) => {
  res.render("signIn", { title: "Sign In" });
};

exports.signUp = (req, res) => {
  res.render("signUp", { title: "Sign Up" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = user.password === password;

    if (passwordMatch) {
      // Passwords match, user is authenticated
      return res.render("application");
    } else {
      // Passwords do not match
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.changePassword = async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail }).exec();
    console.log("User:", user);
  } catch (err) {
    console.error("Error:", err);
    // Handle the error
  }
};

exports.findUser = async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail }).exec();
    console.log("User:", user);
  } catch (err) {
    console.error("Error:", err);
    // Handle the error
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD THE QUERY

    // 1) Filltering
    const queryObj = { ...req.query };
    const excludedFields = ["sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filltering - Refactoring the limiters by adding the $ sign
    // so that it can be handled by mongo - {gte} to {$gte}
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);
    console.log("This is the replaced queryStr: ", JSON.parse(queryStr));

    const query = await User.find(JSON.parse(queryStr));

    //SORTING
    // if (req.body.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    // FILTERING

    // EXECUTE THE QUERY
    const users = await query;

    // SEND THE RESPONSE
    res.status(201).json({
      status: "success",
      "number of users": users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getUsersWhere = async (req, res) => {
  console.log(req.query);

  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  console.log(req.query, queryObj);

  try {
    const users = await User.find(queryObj);
    res.status(201).json({
      status: "success",
      "number of users": users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log("New User created!");
    console.log(req.body);

    // Gets create user post information from the request bosy
    // and then creates that user in the database
    const newUser = await User.create(req.body);
    res.render("signIn", { title: "Sign In" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
