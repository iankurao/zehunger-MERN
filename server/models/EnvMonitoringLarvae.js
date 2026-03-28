const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  monitoringDate: { type: Date, required: true },
  monitoringTime: { type: String, required: true },
  trayFacilityId: { type: String, required: true },
  temperature:    { type: Number, required: true },
  humidity:       { type: Number, required: true },
  ammoniaOdor:    { type: String, required: true },
  notes:          { type: String },
  recordedBy:     { type: String },
}, { timestamps: true });
module.exports = mongoose.model('EnvMonitoringLarvae', schema);
