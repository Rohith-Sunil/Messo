const announcements = require("../models/announcement");
const signup = require("../models/signup");

const complaintsController = async (req, res) => {
  const { hostel_name, announcement } = req.body;
  if (!hostel_name) {
    return res.status(422).json({ error: "Hostel Name is required" });
  }
  if (!announcement) {
    return res.status(422).json({ error: "Announcement is required" });
  }
  const newAnnounce = new announcements({ hostel_name, announcement, isAdmin });
  await newAnnounce.save();
  res.status(201).json(newAnnounce);
};
module.exports = complaintsController;
