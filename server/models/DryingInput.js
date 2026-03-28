const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:                 { type: String, required: true },
  wetHarvestedKg:          { type: Number },
  wetPlacedForDryingKg:    { type: Number },
  driedByPersonnelKg:      { type: Number },
  sandUsedKg:              { type: Number },
  sandReusedKg:            { type: Number },
  notes:                   { type: String },
  recordedBy:              { type: String },
}, { timestamps: true });
module.exports = mongoose.model('DryingInput', schema);
