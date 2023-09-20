const { Schema, model } = require('mongoose');

const News = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model('News', News);
