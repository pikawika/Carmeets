let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let User = mongoose.model("User");
let passport = require("passport");
let jwt = require("express-jwt");

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

router.post("/registreer", function(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }
  User.find({ email: req.body.email }, function(err, result) {
    if (result.length) {
      return res
      .status(400)
      .json({ message: "E-mailadres reeds in gebruik" });
    }
  });
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      return res
      .status(400)
      .json({ message: "Gebruikersnaam reeds in gebruik" });
    }
  });
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.role = "standaard";
  user.soortenMeetings = req.body.soortenMeetings;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post("/login", function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({ token: user.generateJWT(), username: user.username });
    } else {
      return res.status(417).json(info);
    }
  })(req, res, next);
});

router.post("/checkusername", function(req, res, next) {
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      res.json({ username: "alreadyexists" });
    } else {
      res.json({ username: "ok" });
    }
  });
});

router.post("/checkemail", function(req, res, next) {
  User.find({ email: req.body.email }, function(err, result) {
    if (result.length) {
      res.json({ email: "alreadyexists" });
    } else {
      res.json({ email: "ok" });
    }
  });
});

router.post("/changeUsername", authentication, function(req, res, next) {
  if (!req.body.newUsername) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  //id uit token halen
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  User.findOneAndUpdate(
    { _id: idGebruiker },
    { $set: { username: req.body.newUsername } },
    { new: true },


    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      return res.json({ token: obj.generateJWT() });
    }
  );
});

//id uit token halen
router.post("/changePassword", authentication, function(req, res, next) {
  if (!req.body.newPassword) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  //id uit token halen
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  User.findOne(
    { _id: idGebruiker },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      obj.setPassword(req.body.newPassword);

      obj.save(function(err) {
        if (err) {
          return res.status(417).json({
            message:
              "Er liep iets mis met het uitvoeren van deze beveiligde actie."
          });
        }
      });

      return res.json({ token: obj.generateJWT() });
    }
  );
});

router.post("/changeEmail", authentication, function(req, res, next) {
  if (!req.body.newEmail) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  //id uit token halen
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  User.findOneAndUpdate(
    { _id: idGebruiker },
    { $set: { email: req.body.newEmail } },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      return res.json({ token: obj.generateJWT() });
    }
  );
});

router.get("/getPreferences", function(req, res, next) {
  if (!req.headers.authorization){
    return res.json({ soortenMeetings: [] });
  }
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  User.findOne(
    { _id: idGebruiker },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }

      return res.json({ soortenMeetings: obj.soortenMeetings });
    }
  );
});

router.post("/changePreferences", authentication, function(req, res, next) {
  if (!req.body.soortenMeetings) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  //id uit token halen
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  User.findOneAndUpdate(
    { _id: idGebruiker },
    { $set: { soortenMeetings: req.body.soortenMeetings } },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      return res.json({ succes: "yes" });
    }
  );
});

module.exports = router;
