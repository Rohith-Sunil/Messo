const express = require("express");
const router = express.Router();
const {
  createReview,
  getUserRatings,
  getRatingByDayAndMealType,
} = require("../controllers/menuReview");
const menuModel = require("../models/menu_review");
const verifyToken = require("../middleware/verifyToken");
const { redisHelper } = require("../config/redis");

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300;

router.post("/menuReview", createReview);
router.get("/userRatings", getUserRatings);
router.get("/ratingByDayAndMealType", verifyToken, async (req, res) => {
  try {
    const { hostelName } = req.query;
    if (!hostelName) {
      return res.status(400).json({ error: "Hostel name is required" });
    }

    // Try to get from cache first
    const cacheKey = `ratings:${hostelName}`;
    const cachedData = await redisHelper.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache:", cachedData);
      return res.json(cachedData);
    }

    // If not in cache, get from database
    const ratingByDayAndMealType = await menuModel.aggregate([
      {
        $match: {
          hostel_name: hostelName,
        },
      },
      {
        $group: {
          _id: {
            day: "$day",
            meal_type: "$meal_type",
          },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // Store in cache for future requests
    await redisHelper.set(cacheKey, ratingByDayAndMealType, CACHE_DURATION);
    console.log("Stored in cache");

    res.json(ratingByDayAndMealType);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Error fetching ratings" });
  }
});
// router.get('/average',async(req,res)=>{
//     const avg=await menuModel.aggregate([{$group:{_id:null,average:{$avg:"$rating"}}}]);
//     res.json(avg);
// })
// router.get("/ratingByDayAndMealType", async (req, res) => {
//   const ratingByDayAndMealType = await menuModel.aggregate([
//     {
//       $group: {
//         _id: {
//           day: "$day",
//           meal_type: "$meal_type",
//         },
//         averageRating: { $avg: "$rating" },
//       },
//     },
//   ]);
//   res.json(ratingByDayAndMealType);
// });
// module.exports = router;
// router.get('/ratingByDay', async (req, res) => {
//     const ratingByDay = await menuModel.aggregate([
//         {
//             $group: {
//                 _id: "$day",
//                 averageRating: { $avg: "$rating" }
//             }
//         }
//     ]);
//     res.json(ratingByDay);
// });
// router.get("/ratingByDayAndMealType", verifyToken, async (req, res) => {
//   try {
//     const { hostelName } = req.query;
//     if (!hostelName) {
//       return res.status(400).json({ error: "Hostel name is required" });
//     }

//     const ratingByDayAndMealType = await menuModel.aggregate([
//       {
//         $match: {
//           hostel_name: hostelName,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             day: "$day",
//             meal_type: "$meal_type",
//           },
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);

//     res.json(ratingByDayAndMealType);
//   } catch (error) {
//     console.error("Error fetching ratings:", error);
//     res.status(500).json({ error: "Error fetching ratings" });
//   }
// });

// Create review and invalidate cache
router.post("/menuReview", async (req, res) => {
  try {
    const result = await createReview(req, res);

    // Invalidate cache for this hostel's ratings
    const { hostel_name } = req.body;
    if (hostel_name) {
      const cacheKey = `ratings:${hostel_name}`;
      await redisHelper.del(cacheKey);
      console.log("Cache invalidated for:", hostel_name);
    }

    return result;
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Error creating review" });
  }
});

// Get user ratings with Redis caching
router.get("/userRatings", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Try to get from cache first
    const cacheKey = `userRatings:${userId}`;
    const cachedData = await redisHelper.get(cacheKey);

    if (cachedData) {
      console.log("Serving user ratings from cache");
      return res.json(cachedData);
    }

    // If not in cache, get from database
    const userRatings = await getUserRatings(req, res);

    // Store in cache for future requests
    await redisHelper.set(cacheKey, userRatings, CACHE_DURATION);
    console.log("Stored user ratings in cache");

    return userRatings;
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    res.status(500).json({ error: "Error fetching user ratings" });
  }
});

module.exports = router;
