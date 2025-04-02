require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const newUser = require("./models/signup");
const logins = require("./models/login");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { redisClient } = require("./config/redis");
const verifyToken = require("../backend/middleware/verifyToken");
const port = process.env.PORT || 5000;

// Redis session store configuration
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "messo:sess:",
});

const sessionOptions = {
  secret: process.env.SECRET_KEY || "thisisnotsecret",
  resave: false,
  saveUninitialized: false,
  store: redisStore,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

// Only use Redis store if Redis is available
if (redisClient.isOpen) {
  sessionOptions.store = new RedisStore({
    client: redisClient,
    prefix: "messo:sess:",
  });
  console.log("Using Redis for session storage");
} else {
  console.log("Redis not available, using memory store for sessions");
}

const flash = require("connect-flash");
const HR_route = require("./my-routes/HR_route");
const menus = require("./my-routes/menus");
const announce_route = require("./my-routes/announce_route");
const complaints_route = require("./my-routes/complaint_route");

// JWT Secret Keys (should ideally be in environment variables)
const accessTokenSecret = process.env.SECRET_KEY;
const refreshTokenSecret = process.env.SECRET_KEY;
let refreshTokens = [];

mongoose
  .connect(process.env.MONGODB_URI, {
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

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      isSuperAdmin: user.isSuperAdmin,
      isAdmin: user.isAdmin,
      email: user.email,
      name: user.name,
      hostelname: user.hostel_name,
      ObjectID: user._id,
    },
    accessTokenSecret,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      isSuperAdmin: user.isSuperAdmin,
      isAdmin: user.isAdmin,
      email: user.email,
      name: user.name,
      hostelname: user.hostel_name,
      ObjectID: user._id,
    },
    refreshTokenSecret
  );
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await newUser.findAndValidate(email, password);
  if (!email || !password) {
    return res.status(400).json("Please provide email and password");
  }
  if (!foundUser) {
    console.log("Error");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(foundUser);
  const refreshToken = generateRefreshToken(foundUser);
  refreshTokens.push(refreshToken);
  res.json({
    success: true,
    message: "Logged in successfully",
    foundUser: {
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
      isSuperAdmin: foundUser.isSuperAdmin,
      name: foundUser.name,
      ObjectID: foundUser._id,
    },
    token: accessToken,
    refreshToken,
  });
});

app.post("/register", async (req, res) => {
  const { name, hostel_name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const existingUser = await newUser.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const user = new newUser({ name, hostel_name, email, password });
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      email: user.email,
      name: user.name,
    },
    token: accessToken,
    refreshToken,
  });
});

app.post("/logout", verifyToken, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  req.session.user_id = null;
  res.json({ message: "Logged out successfully" });
});

// Add Redis-based caching middleware
const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    try {
      const cachedResponse = await redisClient.get(key);
      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }
      res.originalJson = res.json;
      res.json = (body) => {
        redisClient.setEx(key, duration, JSON.stringify(body));
        res.originalJson(body);
      };
      next();
    } catch (error) {
      console.error("Cache Error:", error);
      next();
    }
  };
};

// Apply caching to specific routes
app.use("/api/v1/menus", cacheMiddleware(300)); // Cache menu data for 5 minutes
app.use("/api/v1/announcements", cacheMiddleware(60)); // Cache announcements for 1 minute

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
