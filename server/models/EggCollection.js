const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  collectionDate:   { type: Date, required: true },
  collectionTime:   { type: String, required: true },
  cageId:           { type: String, required: true },
  eggsCollected:    { type: Number, required: true },
  baitReplaced:     { type: String, required: true },
  eggsIntact:       { type: String, required: true },
  collectorName:    { type: String, required: true },
  collectionMethod: { type: String, required: true },
  notes:            { type: String },
  recordedBy:       { type: String },
}, { timestamps: true });
schema.index({ collectionDate: -1 });
module.exports = mongoose.model('EggCollection', schema);
