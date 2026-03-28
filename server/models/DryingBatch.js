const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:      { type: String, required: true, unique: true },
  dryingDate:   { type: Date, required: true },
  dryingMethod: { type: String, required: true },
  personnel:    { type: String, required: true },
  status:       { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('DryingBatch', schema);
