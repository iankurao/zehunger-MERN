const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  transitionDate:          { type: Date, required: true },
  loveCageId:              { type: String, required: true },
  pupaeWeightAdded:        { type: Number, required: true },
  oldPupaeRemoved:         { type: Number, required: true },
  deadFliesRemoved:        { type: String, required: true },
  waterPointsChecked:      { type: String, required: true },
  newEggCratesInstalled:   { type: String, required: true },
  numberOfCrates:          { type: Number },
  notes:                   { type: String },
  recordedBy:              { type: String },
}, { timestamps: true });
module.exports = mongoose.model('PupaeTransition', schema);
