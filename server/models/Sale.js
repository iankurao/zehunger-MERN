const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  date:       { type: Date, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  product:    { type: String, required: true },
  quantity:   { type: Number, required: true },
  amount:     { type: Number, required: true },
}, { timestamps: true });
schema.index({ date: -1 });
module.exports = mongoose.model('Sale', schema);
