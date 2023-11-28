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

exports.login = (req, res) => {
  console.log("hello");

  //   let email = JSON.stringify(req.body.email);
  //   let userPassword = JSON.stringify(req.body.password);
  //   const loginData = {
  //     email: req.body.email,
  //     password: req.body.password,
  //   };
  //   console.log(email, userPassword);
  //   console.log("The data from the user:", users);
  //   users.data.forEach((user) => {
  //     if (
  //       (user.email === loginData.email) &
  //       (user.password === loginData.password)
  //     ) {
  //       res.render("application", { title: "Application" });
  //     } else {
  //       console.log("No match found!");
  //     }
  //   });
  //   res.render("signIn", { title: "Sign In" });
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
