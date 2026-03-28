const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchNo:            { type: String, required: true },
  prepDate:           { type: Date, required: true },
  organicWasteSource: { type: String, required: true },
  moisturePercentage: { type: Number, required: true },
  wasteParticleSize:  { type: String, required: true },
  foreignMatter:      { type: String, required: true },
  handlerOperator:    { type: String, required: true },
  notes:              { type: String },
}, { timestamps: true });
module.exports = mongoose.model('SubstratePreparation', schema);
