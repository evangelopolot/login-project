const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    // You should hash and salt the password before storing it in the database
  },
});

//document
const User = mongoose.model("User", userSchema);
module.exports = User;
