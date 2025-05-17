
const mongoose = require('mongoose');
const Theme = require('./model');

const uri = process.env.MONGO_URI;

exports.handler = async function () {
  try {
    await mongoose.connect(uri);
    const theme = await Theme.findOne({ adminEmail: "admin@velynt.com" });
    return {
      statusCode: 200,
      body: JSON.stringify(theme || {})
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
