var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.ObjectId;

var aspectCategorySchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('AspectCategory', aspectCategorySchema);
