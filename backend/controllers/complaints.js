const Complaint = require("../models/complaints");

const complaintsController = async (req, res) => {
  const { email, hostel_name, subject, messageType, message } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }
  if (!hostel_name) {
    return res.status(422).json({ error: "Hostel Name is required" });
  }
  if (!subject) {
    return res.status(422).json({ error: "Subject is required" });
  }
  if (!messageType) {
    return res.status(422).json({ error: "Message Type is required" });
  }
  if (!message) {
    return res.status(422).json({ error: "Message is required" });
  }

  const newComplaint = new Complaint({
    email,
    hostel_name,
    subject,
    messageType,
    message,
  });
  await newComplaint.save();
  res.status(201).json(newComplaint);
};

module.exports = complaintsController;
