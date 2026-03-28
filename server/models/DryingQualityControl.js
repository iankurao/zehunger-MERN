const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:            { type: String, required: true },
  qcDate:             { type: Date, required: true },
  sandRemoval:        { type: String, required: true },
  contaminantsFound:  { type: String },
  colorQuality:       { type: String, required: true },
  moistureLevel:      { type: String, required: true },
  qcPersonnel:        { type: String, required: true },
  notes:              { type: String },
  recordedBy:         { type: String },
}, { timestamps: true });
module.exports = mongoose.model('DryingQualityControl', schema);
