const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  cleaningDate:      { type: Date, required: true },
  areasCleaned:      { type: String, required: true },
  cleaningMaterials: { type: String, required: true },
  cleaningPersonnel: { type: String, required: true },
  remarks:           { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HatcheryCleaning', schema);
