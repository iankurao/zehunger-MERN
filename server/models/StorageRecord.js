const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  storageDate:         { type: Date, required: true },
  storageMethod:       { type: String, required: true },
  storageConditions:   { type: String, required: true },
  storageDuration:     { type: Number, required: true },
  plannedUtilization:  { type: String, required: true },
  storageObservations: { type: String },
  recordedBy:          { type: String },
}, { timestamps: true });
schema.index({ storageDate: -1 });
module.exports = mongoose.model('StorageRecord', schema);
