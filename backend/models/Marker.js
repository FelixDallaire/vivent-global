const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true }, // Name of the marker
  description: { type: String, default: '' }, // Description of the marker
});

module.exports = mongoose.model('Marker', markerSchema);
