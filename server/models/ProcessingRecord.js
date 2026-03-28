const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  processingDate:    { type: Date, required: true },
  processingType:    { type: String, required: true },
  processingMethod:  { type: String, required: true },
  wasteProcessed:    { type: Number, required: true },
  byProducts:        { type: String },
  wasteReduction:    { type: Number },
  processingRemarks: { type: String },
  recordedBy:        { type: String },
}, { timestamps: true });
schema.index({ processingDate: -1 });
module.exports = mongoose.model('ProcessingRecord', schema);
