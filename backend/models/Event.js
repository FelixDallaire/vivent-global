const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  mapType: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
