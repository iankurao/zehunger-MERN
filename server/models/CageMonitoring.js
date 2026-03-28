const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  monitoringDate:   { type: Date, required: true },
  cageId:           { type: String, required: true },
  temperature:      { type: Number, required: true },
  humidity:         { type: Number, required: true },
  lightingHours:    { type: Number, required: true },
  ventilationOk:    { type: String, required: true },
  cageCleaned:      { type: String, required: true },
  deadFliesRemoved: { type: String, required: true },
  cageDamage:       { type: String, required: true },
  damageNotes:      { type: String },
  additionalNotes:  { type: String },
  recordedBy:       { type: String },
}, { timestamps: true });
schema.index({ monitoringDate: -1 });
module.exports = mongoose.model('CageMonitoring', schema);
