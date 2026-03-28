const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchNumber:       { type: String, required: true },
  batchDate:         { type: Date, required: true },
  eggIncubationDate: { type: Date, required: true },
  totalEggsGrams:    { type: Number, required: true },
  expectedHatchDate: { type: Date, required: true },
  actualHatchDate:   { type: Date },
  hatchDays:         { type: Number },
  supervisorName:    { type: String, required: true },
  notes:             { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HatcheryBatch', schema);
