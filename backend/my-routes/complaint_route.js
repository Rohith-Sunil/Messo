const {
  complaintsController,
  updateComplaintStatus,
  deleteComplaint,
  exportComplaintsToExcel,
} = require("../controllers/complaints");
const { getAllComplaints } = require("../controllers/getAllComplaints");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
router.post("/sendComplaint", complaintsController);
router.get("/getComplaints", verifyToken, getAllComplaints);
router.put("/updateComplaintStatus/:id", verifyToken, updateComplaintStatus);
router.delete("/deleteComplaint/:id", verifyToken, deleteComplaint);
router.get("/exportComplaints", verifyToken, exportComplaintsToExcel);

module.exports = router;
