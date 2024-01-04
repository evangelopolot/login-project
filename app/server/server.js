const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../../config.env" }); //this must be placed before app
const app = require("../app");

const DB =
  "mongodb+srv://zxangel:xSVNfJTqvXX71OBg@cluster0.pgtglah.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
