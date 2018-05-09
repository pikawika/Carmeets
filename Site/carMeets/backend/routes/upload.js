var express = require("express");
var router = express.Router();
var multer = require("multer");

//enkel foto's
function fileFilter(req, file, cb){
  const extension = file.mimetype.split('/')[0];
  if(extension !== 'image'){
      return cb(new Error('Something went wrong'), false);
  }
  cb(null, true);
};

//maximum +-500kb en 1 file + fotocheck implemented
var uploading = multer({
  dest: "../public/images/",
  limits: {fileSize: 500000, files:1},
  fileFilter : fileFilter
});

router.post('/uploadMeetingImg', uploading.single('afbeelding'), function (req, res, next) {
    res.json("oki");
  })

module.exports = router;
