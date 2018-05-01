var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Meeting = mongoose.model('Meeting');
let jwt = require('express-jwt');

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

//alle meetings verkrijgen
router.get('/API/meetings', function(req, res, next) {
  Meeting.find(function(err, meetings) {
    if (err) return next(err);
    meetings = meetings.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    })
    res.json(meetings);
  });
});

//1 meeting met id krijgen
router.param('meeting', function(req, res, next, id) {
  let query = Meeting.findById(id);
  query.exec(function(err, meeting) {
    if (err) {
      return next(err);
    }
    if (!meeting) {
      return next(new Error('not found ' + id));
    }
    req.meeting = meeting;
    return next();
  });
});

//default meeting meegeven en return
router.get('/API/meeting/:meeting', function(req, res, next) {
  res.json(req.meeting);
});

//toevoegen van een meeting -- geen controle?!
router.post('/API/meeting', authentication, function(req, res, next) {
  let meeting = new Meeting(req.body);
  meeting.save((err, rec) => {
    if (err) return next(err);
    res.json(rec);
  });
});

module.exports = router;
