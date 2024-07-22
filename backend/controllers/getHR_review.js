// const HRModel = require("../models/HR_review");

// const getReview = async (req, res) => {
//   const { name } = req.body;

//   const Hr = await HRModel.find({ name });

//   res.json(Hr);
// };

// module.exports = { getReview };

const HRModel = require("../models/HR_review");

const getReview = async (req, res) => {
  const { name } = req.query;

  const Hr = await HRModel.find({ name });

  res.json(Hr);
};
// Delete a single HR review
const deleteHRReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await HRModel.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting HR review", error });
  }
};

// Delete all reviews for a specific HR
const deleteAllHRReviews = async (req, res) => {
  const hrName = req.query.name;
  try {
    await HRModel.deleteMany({ hrName });
    res.status(200).json({ message: "All reviews deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting HR reviews", error });
  }
};

module.exports = { getReview, deleteHRReview, deleteAllHRReviews };
