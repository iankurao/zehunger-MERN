const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name:    { type: String, required: true },
  contact: { type: String },
  email:   { type: String },
  address: { type: String },
}, { timestamps: true });
schema.index({ name: 1 });
module.exports = mongoose.model('Customer', schema);
