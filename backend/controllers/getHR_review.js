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

module.exports = { getReview };
