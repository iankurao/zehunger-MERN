const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  healthDate:    { type: Date, required: true },
  trayBatchId:   { type: String, required: true },
  observedIssue: { type: String, required: true },
  severity:      { type: String, required: true },
  actionTaken:   { type: String, required: true },
  followUpDate:  { type: Date },
  resolved:      { type: String },
  comments:      { type: String },
  recordedBy:    { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HealthIntervention', schema);
