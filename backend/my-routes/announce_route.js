const express = require("express");
const router = express.Router();

const {
  announceController,
  getAllAnnouncements,
} = require("../controllers/announce");

router.post("/createAnnouncement", announceController);
router.get("/getAllAnnouncements", getAllAnnouncements);

module.exports = router;
