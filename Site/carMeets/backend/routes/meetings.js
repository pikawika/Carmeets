let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let jwt = require("express-jwt");
let Meeting = mongoose.model("Meeting");
const fs = require('fs');

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

//alle meetings verkrijgen sorted on date
router.get("/alleMeetings", function(req, res, next) {
  Meeting.find(
    { date: { $gte: new Date().getTime() - 7 * 1000 * 60 * 60 * 24 } },

    function(err, meetings) {
      if (err) return next(err);
      meetings = meetings.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      res.json(meetings);
    }
  );
});

//1 meeting adhv id krijgen
router.param("singleMeeting", function(req, res, next, id) {
  let query = Meeting.findById(id);
  query.exec(function(err, meeting) {
    if (err) {
      return next(err);
    }
    if (!meeting) {
      return next(new Error("not found " + id));
    }
    req.meeting = meeting;
    return next();
  });
});

//meeting aanvraag met id als param verwerken door singlemeeting te callen
router.get("/singleMeeting/:singleMeeting", function(req, res, next) {
  res.json(req.meeting);
});

router.post("/deleteMeeting", authentication, function(req, res, next) {
  if (!req.body.idMeeting) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  //id uit token halen
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;
  let roleGebruiker = JSON.parse(idUitToken).role;

  let query = Meeting.findById(req.body.idMeeting);
  let idAanmaker;
  let afbeelding;

  query.exec(function(err, meeting) {
    if (err) {
      return next(err);
    }
    if (!meeting) {
      return next(new Error("not found " + id));
    }
    idAanmaker = meeting.idToevoeger;
    afbeelding = meeting.afbeeldingNaam;

    if (roleGebruiker != "admin" && idAanmaker != idGebruiker) {
      return res
        .status(401)
        .json({
          message:
            "U heeft niet voldoende rechten voor deze operatie." + idAanmaker
        });
    }
    Meeting.remove(
      { _id: req.body.idMeeting },

      function(err, rec) {
        if (err) {
          return next(err);
        }
        fs.unlink('public/images/uploads/' + afbeelding);
        return res.json({ deleted: true });
      }
    );
  });
});

router.post("/addMeeting", authentication, function(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "U heeft een veld open gelaten. Vul deze aub in." });
  }

  let newMeeting = new Meeting(req.body);

  //id uit token halen
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
    { new: true },

    function(err, obj) {
      if (err) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie (undo going)."
        });
      }
      if (obj == null) {
        //indien geen gevonden in vorige mag hij liken
        Meeting.findOneAndUpdate(
          { _id: req.body.idMeeting },
          { $push: { listUsersGoing: idGebruiker } },
          { new: true },

          function(err, obj2) {
            if (err) {
              return res.status(417).json({
                message:
                  "Er liep iets mis met het uitvoeren van deze beveiligde actie (going)."
              });
            }
            return res.json({ goingAmount: obj2.listUsersGoing.length });
          }
        );
        //end going
      } else {
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
    { new: true },

    function(err, obj) {
      if (err) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie (undo like)."
        });
      }
      if (obj == null) {
        //indien geen gevonden in vorige mag hij liken
        Meeting.findOneAndUpdate(
          { _id: req.body.idMeeting },
          { $push: { listUsersLiked: idGebruiker } },
          { new: true },

          function(err, obj2) {
            if (err) {
              return res.status(417).json({
                message:
                  "Er liep iets mis met het uitvoeren van deze beveiligde actie (like)."
              });
            }
            return res.json({ likeAmount: obj2.listUsersLiked.length });
          }
        );
        //end liken
      } else {
        return res.json({ likeAmount: obj.listUsersLiked.length });
      }
    }
  );
});

router.get("/likedMeetings", authentication, function(req, res, next) {
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  Meeting.find(
    {
      listUsersLiked: idGebruiker,
      date: { $gte: new Date().getTime() - 7 * 1000 * 60 * 60 * 24 }
    },

    function(err, meetings) {
      if (err) return next(err);
      meetings = meetings.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      res.json(meetings);
    }
  );
});

router.get("/goingMeetings", authentication, function(req, res, next) {
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  Meeting.find(
    {
      listUsersGoing: idGebruiker,
      date: { $gte: new Date().getTime() - 7 * 1000 * 60 * 60 * 24 },
    },

    function(err, meetings) {
      if (err) return next(err);
      meetings = meetings.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      res.json(meetings);
    }
  );
});

router.get("/getTotalLikedNext7D", authentication, function(req, res, next) {
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  Meeting.find(
    {
      listUsersLiked: idGebruiker,
	  { $and: [ { date: { $lte: new Date().getTime() + 7 * 1000 * 60 * 60 * 24 } }, { date: { $gte: new Date().getTime() } } ] }
    },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      return res.json({ likeAmount: obj.length });
    }
  );
});

router.get("/getTotalGoingNext7D", authentication, function(req, res, next) {
  let token = req.headers.authorization.substring(7);
  let idUitToken = new Buffer(token.split(".")[1], "base64").toString();
  let idGebruiker = JSON.parse(idUitToken)._id;

  Meeting.find(
    {
      listUsersGoing: idGebruiker,
      { $and: [ { date: { $lte: new Date().getTime() + 7 * 1000 * 60 * 60 * 24 } }, { date: { $gte: new Date().getTime() } } ] }
    },

    function(err, obj) {
      if (err || obj == null) {
        return res.status(417).json({
          message:
            "Er liep iets mis met het uitvoeren van deze beveiligde actie."
        });
      }
      return res.json({ goingAmount: obj.length });
    }
  );
});

module.exports = router;
