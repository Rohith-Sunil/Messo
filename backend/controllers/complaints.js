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

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ error: "Error updating complaint status" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ error: "Error deleting complaint" });
  }
};

module.exports = {
  complaintsController,
  deleteComplaint,
  updateComplaintStatus,
};
