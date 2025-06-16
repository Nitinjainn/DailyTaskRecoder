const mongoose = require('mongoose');

const worklogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  todayWork: { type: String },
  technicalDetails: { type: String },
  problemsFaced: { type: String },
  solutions: { type: String },
  nextPlan: { type: String },
  tags: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model('Worklog', worklogSchema);