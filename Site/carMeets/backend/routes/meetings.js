let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let jwt = require("express-jwt");
let Meeting = mongoose.model("Meeting");

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});

router.post("/addMeeting", function(req, res, next) {
  if (
    !req.body
  ) {
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

  newMeeting.save(function(err, rec) {
    if (err) {
      return next(err);
    }
    return res.json({ toegevoegd: newMeeting._id });
  });
});

module.exports = router;
