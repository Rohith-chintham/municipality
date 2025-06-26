const Complaint = require('../models/Complaint');

// @desc    File a new complaint
// @route   POST /api/complaints
// @access  Private (Citizen)
const fileComplaint = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const complaint = new Complaint({
      title,
      description,
      location,
      user: req.user._id
    });

    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private (Citizen/Admin)
const getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'admin') {
      complaints = await Complaint.find().populate('user', 'name email');
    } else {
      complaints = await Complaint.find({ user: req.user._id });
    }

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id
// @access  Private (Admin)
const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  fileComplaint,
  getComplaints,
  updateStatus,
};
