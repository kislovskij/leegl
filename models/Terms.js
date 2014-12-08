var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.ObjectId,
  Aspect = require('../models/Aspect');

var termsSchema = new mongoose.Schema({
  name: String,
  serviceDomains: [
    {
      type: String, lowercase: true
    }
  ],
  termsUrls: [
    {
      type: String
    }
  ],
  aspects: [
    {
      aspect: {
        type: ObjectId,
        ref: 'Aspect'
      },
      weight: Number,
      citation: String
    }
  ],
  registrationUrl: String,
  interception: String,
  selector: String,
  reviewed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Terms', termsSchema);
