const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  date:       { type: Date, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  feedback:   { type: String, required: true },
  rating:     { type: Number, min: 1, max: 5 },
}, { timestamps: true });
schema.index({ date: -1 });
module.exports = mongoose.model('CustomerFeedback', schema);
