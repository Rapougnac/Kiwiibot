const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const languageSchema = mongoose.Schema({
  _id: requiredString,
  language: requiredString,
});

module.exports = mongoose.model('languages', languageSchema);
