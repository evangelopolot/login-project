const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../../models/userModel");
const Email = require("./../utils/email");
const AppError = require("./../utils/appError");
const catchAsyncError = require("./../utils/catchAsync");
const { log } = require("console");

const signToken = (id) => {
  return jwt.sign({ id: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + PerformanceObserverEntryList.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true // Can not be accessed of modified by the browser
  }

  res.cookie('jwt', token, cookieOptions)

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
exports.signup = async (req, res, next) => {
  // Make sure you are only accepting what you need from the users and nothing else
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  console.log("This is the new user, ", newUser);

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  // Check if email and password exist
  if (!email || !password) {
    // Replace this with the Error class you've created
    // use return to end the journey if an error is encouted or otherwise REMBEMER
    return next(new Error("Please provide email and password!", 404));
  }

  // Check if the users exists & password matches
  // Since password select is false, it's not returned, so you need to select it explicitly and add a plus sign to it.
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error("Incorrect email or password!", 401));
  }

  const token = signToken(user._id);
  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  let token;

  // 1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    return next(new Error("You are not authicated.", 401));
  }

  // 2) Verify the token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) Check if user still exists

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return new Error("There is no existing user that matches the id", 401);
  }

  // 4) Check if user changed password after the JWT token was issued

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new Error("User recently changed password! Please login again", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
};

exports.restrictTo = (...roles) => {
  // roles is restricted to only admin roles
  return (req, res, next) => {
    // req.user.role gives us the role of the user from the protected middleware
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      console.log("hit");
      return next(
        new Error("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    await Email({
      email: user.email,
      subject: "Your password reset token",
      message: `Hello homie, this is the url ${resetURL}`,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.error("Error sending password reset email:", error);

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find user with that token and check if it has not expired.
  const user = await User.findOne({
    passwordResetToken: hashedtoken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has expired, and there is user, set the new passord
  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password"); // though protected, req.user = the user

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(" Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
