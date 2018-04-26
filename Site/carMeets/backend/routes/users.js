let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');
let jwt = require('express-jwt');

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

router.post('/registreer', function(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({ message: 'U heeft een veld open gelaten. Vul deze aub in.' });
  }
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.role = "standaard";
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'U heeft een veld open gelaten. Vul deze aub in.' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function(req, res, next) {
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      res.json({ username: 'alreadyexists' });
    } else {
      res.json({ username: 'ok' });
    }
  });
});

router.post('/checkemail', function(req, res, next) {
  User.find({ email: req.body.email }, function(err, result) {
    if (result.length) {
      res.json({ email: 'alreadyexists' });
    } else {
      res.json({ email: 'ok' });
    }
  });
});

//moet authenticated zijn!
router.post('/changePassword', authentication, function(req, res, next) {
  if (!req.body.password) {
    return res.status(400).json({ message: 'U heeft een veld open gelaten. Vul deze aub in.' });
  }
  
});

module.exports = router;
