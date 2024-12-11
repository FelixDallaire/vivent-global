const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'organizer' },
  avatar: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
