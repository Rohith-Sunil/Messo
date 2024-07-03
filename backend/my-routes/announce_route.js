const express = require("express");
const router = express.Router();

const announceController = require("../controllers/announce");
const { getAllAnnouncements } = require("../controllers/getAnnouncement");

router.post("/createAnnouncement", announceController);
router.get("/getAllAnnouncment", getAllAnnouncements);

module.exports = router;
