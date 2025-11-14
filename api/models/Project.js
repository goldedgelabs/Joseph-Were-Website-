const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  eta: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  status: { type: String, enum: ['coming','live','archived'], default: 'coming' }
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
