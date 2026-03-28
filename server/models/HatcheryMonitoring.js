const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  monitoringDate:   { type: Date, required: true },
  temperatureC:     { type: Number, required: true },
  humidityPercent:  { type: Number, required: true },
  adjustmentsMade:  { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HatcheryMonitoring', schema);
