const express = require("express");
const app = express();
const mongoose = require("mongoose");
var router = require("./route/routes");
mongoose.set("strictQuery", false);
const cors = require("cors");

app.use(cors({ origin: "http://localhost:8081" }));

app.listen(3000, function check(err) {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Server is running on port 3000");
  }
});

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use(express.json());
app.use(router);
