const fs = require("fs");
const path = require("path");
const users = require("../data/data.json");
const { log } = require("console");

exports.homepage = (req, res) => {
  res.render("index", { title: "Home" });
};

exports.signIn = (req, res) => {
  res.render("signIn", { title: "Sign In" });
};

exports.signUp = (req, res) => {
  res.render("signUp", { title: "Sign Up" });
};

exports.login = (req, res) => {
  const filePath = path.join(__dirname, "../", "data", "data.json");

  let email = JSON.stringify(req.body.email);
  let userPassword = JSON.stringify(req.body.password);
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(email, userPassword);
  console.log("The data", users);
  users.data.forEach((user) => {
    if (
      (user.email === loginData.email) &
      (user.password === loginData.password)
    ) {
      console.log("We have a match");
    } else {
      console.log("No match found!");
    }
  });
  res.render("signIn", { title: "Sign In" });
};

exports.createUser = (req, res) => {
  // Path to the JSON file
  const filePath = path.join(__dirname, "../", "data", "data.json");

  // Read existing JSON data
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading JSON file:", readErr);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Parse the existing JSON data
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Append new user data
    const newUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    jsonData.data.push(newUserData);

    // Write the updated JSON data back to the file
    fs.writeFile(
      filePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing to JSON file:", writeErr);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        console.log("Data appended to JSON file successfully.");
        res.render("signIn", { title: "Sign In" });
      }
    );
  });
};
