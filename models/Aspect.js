var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.ObjectId,
  AspectCategory = require('../models/AspectCategory');

var aspectSchema = new mongoose.Schema({
  text: String,
  category: {
  	type: ObjectId,
  	ref: 'AspectCategory'
  }
});

module.exports = mongoose.model('Aspect', aspectSchema);
