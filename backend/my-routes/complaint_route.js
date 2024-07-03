const complaintsController = require("../controllers/complaints");
const { getAllComplaints } = require("../controllers/getAllComplaints");
const express = require("express");
const router = express.Router();

router.post("/sendComplaint", complaintsController);
router.get("/getComplaints", getAllComplaints);

module.exports = router;
