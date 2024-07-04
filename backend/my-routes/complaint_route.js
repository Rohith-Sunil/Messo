const {
  complaintsController,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaints");
const { getAllComplaints } = require("../controllers/getAllComplaints");
const express = require("express");
const router = express.Router();

router.post("/sendComplaint", complaintsController);
router.get("/getComplaints", getAllComplaints);
router.put("/updateComplaintStatus/:id", updateComplaintStatus);
router.delete("/deleteComplaint/:id", deleteComplaint);

module.exports = router;
