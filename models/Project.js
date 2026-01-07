const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  files: {
    html: String,
    css: String,
    js: String,
    readme: String,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);