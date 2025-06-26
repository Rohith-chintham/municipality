const express = require('express');
const {
  fileComplaint,
  getComplaints,
  updateStatus
} = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// File a new complaint (citizen)
router.post('/', protect, fileComplaint);

// Get complaints (admin sees all, citizen sees their own)
router.get('/', protect, getComplaints);

// Update complaint status (admin only)
router.put('/:id', protect, adminOnly, updateStatus);

module.exports = router;
