const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);
router.get('/records/:userId', attendanceController.getAttendanceRecords);

module.exports = router;
