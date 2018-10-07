var express = require("express");
var router = express.Router();
var multer = require("multer");

//enkel jgps
function fileFilter(req, file, cb){
  if(file.mimetype !== 'image/jpeg'){
      return cb(new Error('Something went wrong'), false);
  }
  cb(null, true);
};


//maximum +-500kb en 1 file + fotocheck implemented
var uploading = multer({
  dest: "public/images/uploads",
  limits: {fileSize: 1024 * 500, files:1},
  fileFilter : fileFilter
});

router.post('/uploadMeetingImg', uploading.single('afbeelding'), function (req, res, next) {
    res.json({filename: req.file.filename});
  })

module.exports = router;
