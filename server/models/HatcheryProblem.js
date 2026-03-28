const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  problemDate:          { type: Date, required: true },
  problemIdentified:    { type: String, required: true },
  proposedSolution:     { type: String, required: true },
  responsiblePerson:    { type: String, required: true },
  daysToImplement:      { type: Number },
  resolutionStatus:     { type: String },
  additionalComments:   { type: String },
}, { timestamps: true });
module.exports = mongoose.model('HatcheryProblem', schema);
