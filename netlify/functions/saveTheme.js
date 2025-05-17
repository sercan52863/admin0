
const mongoose = require('mongoose');
const Theme = require('./model');

const uri = process.env.MONGO_URI;

exports.handler = async function (event) {
  try {
    const data = JSON.parse(event.body);
    await mongoose.connect(uri);
    const updated = await Theme.findOneAndUpdate(
      { adminEmail: "admin@velynt.com" },
      {
        logoUrl: data.logoUrl,
        themeColor: data.themeColor,
        fontFamily: data.fontFamily
      },
      { upsert: true, new: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updated)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
