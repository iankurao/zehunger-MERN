const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  harvestDate:      { type: Date, required: true },
  trayBatchId:      { type: String, required: true },
  instarStage:      { type: String, required: true },
  larvaeCollected:  { type: Number, required: true },
  processingMethod: { type: String, required: true },
  storageTemp:      { type: Number },
  notes:            { type: String },
  recordedBy:       { type: String },
}, { timestamps: true });
schema.index({ harvestDate: -1 });
module.exports = mongoose.model('HarvestYield', schema);
