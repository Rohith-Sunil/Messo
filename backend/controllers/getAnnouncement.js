const Announcement = require("../models/announcement");

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Error fetching announcements" });
  }
};

module.exports = { getAllAnnouncements };
