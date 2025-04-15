const whisperService = require('../services/whisperService');
const nlpService = require('../services/nlpService');
const Booking = require('../models/Booking');
const dotenv = require('dotenv');
dotenv.config();
const handleRecording = async (req, res) => {
  console.log("Twilio Request Body:", req.body);
  const recordingUrl = req.body.RecordingUrl;
  const callerId = req.body.From;
  if (!recordingUrl) {
    console.error("RecordingUrl not found in request body:", req.body);
    return res.status(400).json({ error: "Recording URL not found" });
  }
  
  try {
    const transcript = await whisperService.transcribe(recordingUrl);
    const { from, to } = nlpService.extractLocations(transcript);

    const booking = new Booking({ from, to, callerId, transcript });
    await booking.save();

    res.send(`<Response><Say>Your cab has been booked from ${from} to ${to}</Say></Response>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing voice');
  }
};

const processBooking = async (req, res) => {
  const { audioUrl, callerId } = req.body;
  const transcript = await whisperService.transcribe(audioUrl);
  const { from, to } = nlpService.extractLocations(transcript);

  const booking = new Booking({ from, to, callerId, transcript });
  await booking.save();

  res.json({ success: true, from, to, transcript });
};

module.exports = { handleRecording, processBooking };
