const express = require("express");
require("dotenv/config");
const homeRoute = require("./routes/Home");
const personRoute = require("./routes/Person");
const mongoose = require("mongoose");

const app = express();
const port = 7000;

//MiddleWares
app.use(express.json()); //body parser
app.use("/", homeRoute);
app.use("/persons", personRoute);

// app.get("/", (req, res) => {
//   res.send("this is home page");
// });
//Connect to DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to DB");
  }
);

//Server Listening
app.listen(port);
