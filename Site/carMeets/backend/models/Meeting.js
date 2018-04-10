var mongoose = require('mongoose');

var MeetSchema = new mongoose.Schema({
  name: String,
  date: Date,
  gemeente: String,
  shortDescription: String,
  fullDescription: String,
  categories: [String],
  site: String
});

mongoose.model('Meeting', MeetSchema);
