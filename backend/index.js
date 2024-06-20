const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const newUser = require("./models/signup");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/mess", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  newUser.findOne({ email }).then((user) => {
    if (user) {
      if (password === user.password) {
        res.json({ message: "Login Successfull" });
      } else {
        res.json({ message: "Invalid Credentials" });
      }
    } else {
      res.json({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const user = newUser
    .create(req.body)
    .then((users) => res.join(users))
    .catch((err) => res.json(err));

  console.log(user.name);
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
