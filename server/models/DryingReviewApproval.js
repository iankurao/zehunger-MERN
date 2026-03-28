const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  batchId:        { type: String, required: true },
  reviewedBy:     { type: String, required: true },
  reviewDate:     { type: Date, required: true },
  approvalStatus: { type: String, required: true },
  comments:       { type: String },
  recordedBy:     { type: String },
}, { timestamps: true });
module.exports = mongoose.model('DryingReviewApproval', schema);
