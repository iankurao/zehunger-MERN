const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  maintenanceDate:   { type: Date, required: true },
  moatCheck:         { type: String, required: true },
  antsPresent:       { type: String, required: true },
  rodentsPresent:    { type: String, required: true },
  birdNetOk:         { type: String, required: true },
  trenchRefilled:    { type: String, required: true },
  maintenanceNotes:  { type: String, required: true },
  recordedBy:        { type: String },
}, { timestamps: true });
schema.index({ maintenanceDate: -1 });
module.exports = mongoose.model('FacilityMaintenance', schema);
