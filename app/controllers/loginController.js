const path = require("path");
const User = require("../../models/userModel");

exports.homepage = (req, res) => {
  res.render("application", { title: "Home" });
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
      return res.render("application", { title: "Home" });
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
    const users = await User.find();
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
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
