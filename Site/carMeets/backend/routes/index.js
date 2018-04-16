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

router.post('/API/meetings', function(req, res, next) {
  let meeting = new Meeting(req.body);
  meeting.save((err, rec) => {
    if (err) return next(err);
    res.json(rec);
  });
});

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

module.exports = router;
