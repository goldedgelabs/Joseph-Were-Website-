const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: { type: String, default: 'Your Name' },
  contact: { type: String, default: '' },
  email: { type: String, default: '' },
  dob: { type: String, default: '' },
  occupation: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
