const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// name ,email, photo, password, passworConfirm
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Must provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Must provide a last name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE?
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  // Only run this func if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //??????
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassord
) {
  return await bcrypt.compare(candidatePassword, userPassord);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.changedPasswordAt) {
    const changePasswordTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changePasswordTimeStamp;
  }

  return false;
};

// instance method
userSchema.methods.createPasswordResetToken = function () {
  // Token sent to user to reset password
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//document
const User = mongoose.model("User", userSchema);
module.exports = User;
