
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  adminEmail: String,
  logoUrl: String,
  themeColor: String,
  fontFamily: String
});

module.exports = mongoose.models.Theme || mongoose.model('Theme', themeSchema);
