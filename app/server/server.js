const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("../app");

dotenv.config({ path: "../../config.env" });

const DB =
  "mongodb+srv://zxangel:xSVNfJTqvXX71OBg@cluster0.pgtglah.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
