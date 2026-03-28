const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:               { type: String, required: true },
  driedProducedKg:       { type: Number, required: true },
  solarDryingTakenKg:    { type: Number },
  storedInSiloBagKg:     { type: Number },
  soldKg:                { type: Number },
  actualRatio:           { type: String },
  yieldPercentage:       { type: Number },
  notes:                 { type: String },
  recordedBy:            { type: String },
}, { timestamps: true });
module.exports = mongoose.model('DryingOutput', schema);
