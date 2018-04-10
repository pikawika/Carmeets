var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Meeting = mongoose.model('Meeting');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works');
});

router.get('/API/meetings', function(req, res, next) {
  Meeting.find(function(err, meetings) {
    if (err) return next(err);
    res.json(meetings);
  });
});

router.get('/API/meetings/:meeting', function(req, res, next) {
  res.json(req.meeting);
});

router.post('/API/meetings', function(req, res, next) {
  let meeting = new Meeting(req.body);
  meeting.save((err, rec) => {
    if (err) return next(err);
    res.json(rec);
  });
});

router.delete('/API/meetings/:meeting', function(req, res, next) {
  req.meeting.remove(function(err) {
    if (err) return next(err);
    res.json('meeting removed');
  });
});

module.exports = router;
