let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let mongoose = require("mongoose");
let User = mongoose.model("User");

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        User.findOne({ email: username }, function(err, user2) {
          if (err) {
            return done(err);
          }
          if (!user2) {
            return done(null, false, { message: "geen user gevonden met die username of email." });
          }
          if (!user2.validPassword(password)) {
            return done(null, false, { message: "Wachtwoord incorrect." });
          }
          return done(null, user2);
        });
      }
      else {
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Wachtwoord incorrect." });
        }
        return done(null, user);
      }
    });
  })
);
