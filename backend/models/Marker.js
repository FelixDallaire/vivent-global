const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Marker', markerSchema);