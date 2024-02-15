const Users = require("./../../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getBase = catchAsync((req, res) => {
  res.status(200).render("base", {
    title: "The Base",
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  // Get all users
  const users = await Users.find();

  res.status(200).render("overview", {
    title: "All tours",
    users,
  });
});

exports.getDashboard = catchAsync(async (req, res) => {
  res.status(200).render("dashboard", {
    title: "Dashboard",
  });
});

exports.getPasswordReset = catchAsync(async (req, res) => {
  res.status(200).render("password-reset", {
    title: "Login to your account",
  });
});

exports.getSignUp = catchAsync(async (req, res) => {
  res.status(200).render("sign-up", {
    title: "Login to your account",
  });
});

exports.getLogin = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Login to your account",
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "Tours",
  });
};
