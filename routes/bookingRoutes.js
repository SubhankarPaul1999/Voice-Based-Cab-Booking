const express = require('express');
const router = express.Router();
const { handleRecording, processBooking } = require('../controllers/bookingController');

router.post('/record', handleRecording);
router.post('/process', processBooking);

module.exports = router;
