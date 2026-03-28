const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  collectionDate:      { type: Date, required: true },
  collectionTime:      { type: String, required: true },
  sourceType:          { type: String, required: true },
  sourceName:          { type: String, required: true },
  wasteType:           { type: String, required: true },
  wasteWeight:         { type: Number, required: true },
  segregationStatus:   { type: String, required: true },
  collectionPersonnel: { type: String, required: true },
  contaminantsFound:   { type: String },
  collectionNotes:     { type: String },
  recordedBy:          { type: String },
}, { timestamps: true });
schema.index({ collectionDate: -1 });
module.exports = mongoose.model('WasteSourcing', schema);
