const mongoose = require('mongoose');

const UrlScanSchema = new mongoose.Schema({
  url: String,
  uuid: String,
  data: Object,
  createdAt: Date
});

module.exports = mongoose.model('UrlScan', UrlScanSchema);
