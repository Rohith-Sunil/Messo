const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const newUser = require("./models/signup");
const logins = require("./models/login");
const session = require("express-session");

const port = 5000;
const sessionOptions = {
  secret: "thisisnotsecret",
  resave: false,
  saveUninitialized: false,
};
const flash = require("connect-flash");
const HR_route = require("./my-routes/HR_route");
const menus = require("./my-routes/menus");
const announce_route = require("./my-routes/announce_route");
const complaints_route = require("./my-routes/complaint_route");
mongoose
  .connect("mongodb+srv://messo:1234@messo.gmb5mku.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
app.use("/api/v1", HR_route);
app.use("/api/v1", complaints_route);
app.use("/api/v1", menus);
app.use("/api/v1", announce_route);
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// app.get("/", (req, res) => {
//   res.send("Home page");
//   console.log("Welcome to home page");
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await newUser.findAndValidate(email, password);
  if (!email || !password) {
    res.json("please provide email and password");
  }
  if (!foundUser) res.json("invalid credentials");

  console.log(foundUser);
  if (foundUser) {
    req.flash("info", "Login successful");
    console.log("Login successful");

    const token = foundUser.createJWT();
    res.json({
      success: true,
      message: "loggedin",
      foundUser: {
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
      },
      name: foundUser.name,
      token,
    });
    // res.json({ status: "exist", message: "Login successful" });
    // req.session.user_id = foundUser._id;
  } else {
    // req.flash("failed", "Login failed");
    // res.json({ status: "notexist", message: "Login failed" });
  }
});

app.post("/register", async (req, res) => {
  const { name, hostel_name, email, password, confirm_password } = req.body;
  const users = await newUser.find({ email });
  if (users) {
    console.log("Already registered");
  }
  const user = new newUser({
    name,
    hostel_name,
    email,
    password,
    confirm_password,
  });
  console.log(user);
  await user.save();

  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
  // req.session.user_id = user._id;
  console.log("Hey User");
  // res.redirect("/");
});

app.post("/logout", (req, res, next) => {
  req.session.user_id = null;
  res.redirect("/login");
});

app.listen(5000, () => {
  console.log(`Server started at port ${port}...`);
});
