const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  barrelId:        { type: String, required: true },
  baitType:        { type: String, required: true },
  ingredientsAdded:{ type: String, required: true },
  startDate:       { type: Date, required: true },
  readyDate:       { type: Date, required: true },
  usedInCageIds:   { type: String },
  notes:           { type: String },
  recordedBy:      { type: String },
}, { timestamps: true });
module.exports = mongoose.model('BaitPreparation', schema);
