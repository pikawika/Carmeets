let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let jwt = require("express-jwt");
let Meeting = mongoose.model("Meeting");

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

router.post("/addMeeting", authentication, function(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  let newMeeting = new Meeting(req.body);

  //id uit token halen -- to implement
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  newMeeting.idToevoeger = idGebruiker;
  newMeeting.listUsersGoing = [];
  newMeeting.listUsersLiked = [];

  newMeeting.save(function(err, rec) {
    if (err) {
      return next(err);
    }
    return res.json({ toegevoegd: newMeeting._id });
  });
});

router.post("/toggleGoing", authentication, function(req, res, next) {
  if (!req.body.idMeeting) {
    return res
      .status(400)
      .json({ message: "Vereiste paramater niet voorzien." });
  }

  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  //indien in de lijst delete
  Meeting.findOneAndUpdate(
    { _id: req.body.idMeeting, listUsersGoing: idGebruiker },
    { $pull: { listUsersGoing: idGebruiker } },

    function(err, obj) {
      if (err) {
        return res.status(401).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie (undo going)."
        });
      }
      if (obj == null) {
        //indien geen gevonden in vorige mag hij liken
        Meeting.findOneAndUpdate(
          { _id: req.body.idMeeting },
          { $push: { listUsersGoing: idGebruiker } },

          function(err, obj2) {
            if (err) {
              return res.status(401).json({
                message:
                  "Er liep iets mis met het uitvoeren van deze beveiligde actie (going)."
              });
            }
            return res.json({ goingAmount: obj2.listUsersGoing.length });
          }
        );
        //end going
      }
      else{
        return res.json({ goingAmount: obj.listUsersGoing.length });
      }
    }
  );
});

router.post("/toggleLiked", authentication, function(req, res, next) {
  if (!req.body.idMeeting) {
    return res
      .status(400)
      .json({ message: "Vereiste paramater niet voorzien." });
  }

  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  //indien in de lijst delete
  Meeting.findOneAndUpdate(
    { _id: req.body.idMeeting, listUsersLiked: idGebruiker },
    { $pull: { listUsersLiked: idGebruiker } },

    function(err, obj) {
      if (err) {
        return res.status(401).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie (undo like)."
        });
      }
      if (obj == null) {
        //indien geen gevonden in vorige mag hij liken
        Meeting.findOneAndUpdate(
          { _id: req.body.idMeeting },
          { $push: { listUsersLiked: idGebruiker } },

          function(err, obj2) {
            if (err) {
              return res.status(401).json({
                message:
                  "Er liep iets mis met het uitvoeren van deze beveiligde actie (like)."
              });
            }
            return res.json({ likeAmount: obj2.listUsersLiked.length });
          }
        );
        //end liken
      }
      else {
        return res.json({ likeAmount: obj.listUsersLiked.length });
      }
    }
  );
});

module.exports = router;
