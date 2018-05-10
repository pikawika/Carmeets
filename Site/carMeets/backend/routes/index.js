var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Meeting = mongoose.model('Meeting');
let jwt = require('express-jwt');

let authentication = jwt({
  secret: process.env.MEETING_BACKEND_SECRET
});


module.exports = router;
