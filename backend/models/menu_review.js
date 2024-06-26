const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuReviewSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  //   menu_name: {
  //     type: String,
  //     // required: true,
  //   },
  day: {
    type: String,
    required: true,
  },
  meal_type: {
    type: String,
    enum: ["Breakfast", "Lunch", "Snacks", "Dinner"],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("menu_review", menuReviewSchema);
