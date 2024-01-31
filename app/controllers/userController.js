const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../../models/userModel");

const filterObj = (obj, ...allowedfields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedfields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

exports.updateAccountdetails = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("This is not a route for changing password.", 401)
    );
  }

  // Filtered out unwanted field names
  const filteredBody = filterObj(req.body, "firstName", "lastName", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  try {
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteMe = catchAsync( async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null
  });
})