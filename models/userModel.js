const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    // You should hash and salt the password before storing it in the database
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE?
      validator: function(el) {
        return el === this.password;
      }, 
      message: 'Passwords are not the same'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function(next) {
  // Only run this func if password was actually modified
  if(!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password =  await bcrypt.hash(this.password, 12);

  //Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
})

//document
const User = mongoose.model("User", userSchema);
module.exports = User;
