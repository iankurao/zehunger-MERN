const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:              { type: String, required: true },
  feedingDate:          { type: Date, required: true },
  feedPer5gEggsGrams:   { type: Number },
  totalFeedUsedGrams:   { type: Number },
  daysToUtilize:        { type: Number },
  feedType:             { type: String },
  feedSource:           { type: String },
  distributionMethod:   { type: String },
  notes:                { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HatcheryFeeding', schema);
