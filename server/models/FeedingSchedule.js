const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  feedingDate:   { type: Date, required: true },
  trayBatchId:   { type: String, required: true },
  larvaeAgeDays: { type: Number, required: true },
  larvaeWeight:  { type: Number, required: true },
  feedType:      { type: String, required: true },
  feedQuantity:  { type: Number, required: true },
  startWeight:   { type: Number },
  endWeight:     { type: Number },
  consumption:   { type: Number },
  operator:      { type: String, required: true },
  recordedBy:    { type: String },
}, { timestamps: true });
schema.index({ feedingDate: -1 });
module.exports = mongoose.model('FeedingSchedule', schema);
