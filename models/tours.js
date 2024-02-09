const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// name ,email, photo, password, passworConfirm
const toursSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  images: [String],
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  startLocation: {
    // GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
    day: Number,
  },
});

toursSchema.pre("save", async function (next) {
  // Only run this func if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

//document
const Tours = mongoose.model("Tours", toursSchema);
module.exports = Tours;
