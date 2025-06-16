const mongoose = require('mongoose');

const IpLookupSchema = new mongoose.Schema({
  ip: { type: String, required: true, index: true },
  domain: String,
  geo: Object,
  abuse: Object,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model('IpLookup', IpLookupSchema);