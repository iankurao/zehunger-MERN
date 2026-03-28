const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  date:       { type: Date, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  product:    { type: String },
  quantity:   { type: Number },
  status:     { type: String, required: true },
  notes:      { type: String },
}, { timestamps: true });
schema.index({ date: -1 });
module.exports = mongoose.model('Delivery', schema);
