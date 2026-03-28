const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  monitoringDate:    { type: Date, required: true },
  monitoringTime:    { type: String, required: true },
  temperature:       { type: Number, required: true },
  humidity:          { type: Number, required: true },
  odorLevel:         { type: String, required: true },
  pestPresence:      { type: String, required: true },
  pestDetails:       { type: String },
  mitigationActions: { type: String },
  remarks:           { type: String },
  recordedBy:        { type: String },
}, { timestamps: true });
schema.index({ monitoringDate: -1 });
module.exports = mongoose.model('EnvMonitoringWaste', schema);
