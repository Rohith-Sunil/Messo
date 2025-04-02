const Redis = require("redis");

// Create Redis client with retry strategy
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a total retry time of 1 hour
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // Reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});

// Connect to Redis with error handling
redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
  // Don't throw the error, just log it
});

// Handle Redis connection events
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Helper functions for Redis operations with fallback
const redisHelper = {
  // Set key-value pair with optional expiration (in seconds)
  async set(key, value, expireSeconds = null) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return false;
      }
      await redisClient.set(key, JSON.stringify(value));
      if (expireSeconds) {
        await redisClient.expire(key, expireSeconds);
      }
      return true;
    } catch (error) {
      console.error("Redis Set Error:", error);
      return false;
    }
  },

  // Get value by key
  async get(key) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return null;
      }
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis Get Error:", error);
      return null;
    }
  },

  // Delete key
  async del(key) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return false;
      }
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error("Redis Delete Error:", error);
      return false;
    }
  },

  // Check if key exists
  async exists(key) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return false;
      }
      return await redisClient.exists(key);
    } catch (error) {
      console.error("Redis Exists Error:", error);
      return false;
    }
  },

  // Set multiple hash fields
  async hmset(key, fields) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return false;
      }
      await redisClient.hSet(key, fields);
      return true;
    } catch (error) {
      console.error("Redis HMSet Error:", error);
      return false;
    }
  },

  // Get all hash fields
  async hgetall(key) {
    try {
      if (!redisClient.isOpen) {
        console.log("Redis not connected, skipping cache");
        return null;
      }
      return await redisClient.hGetAll(key);
    } catch (error) {
      console.error("Redis HGetAll Error:", error);
      return null;
    }
  },
};

module.exports = {
  redisClient,
  redisHelper,
};
