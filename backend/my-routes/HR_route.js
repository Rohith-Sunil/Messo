const createReview = require("../controllers/HR_Review").createReview;
const express = require("express");
const { getReview } = require("../controllers/getHR_review");
const router = express.Router();

router.post("/createReview", createReview);
router.get("/HR-Review", getReview);
module.exports = router;
