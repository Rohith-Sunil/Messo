const menuModel = require("../models/menu_review");

const createReview = async (req, res) => {
  const { hostel_name, day, rating, meal_type } = req.body;

  if (!hostel_name) {
    return res.status(422).json({ error: "Hostel Name is required" });
  }
  //   if (!menu_name) {
  //     return res.status(422).json({ error: "Menu Name is required" });
  //   }
  if (!day) {
    return res.status(422).json({ error: "Day is required" });
  }
  if (!rating) {
    return res.status(422).json({ error: "Rating is required" });
  }

  const newReview = new menuModel({
    hostel_name,
    day,
    rating,
    meal_type,
  });
  await newReview.save();
  res.status(201).json(newReview);
};
module.exports = { createReview };
