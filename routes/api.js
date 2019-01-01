var express = require('express');
var conf = require('config');
var router = express.Router();

var DataStore = require('nedb');
var db = new DataStore({
  filename: "db/storage.db",
  autoload: true
});


router.get('/config', function(req, res, next) {
  res.json(conf);
});

router.get('/status', function(req, res, next) {
  res.json(conf);
});

router.get('/reaction', function(req, res, next) {
  var reaction = {
    "speakerId" : req.query.speakerId,
    "name": req.query.name,
    "categoryId": req.query.categoryId
  };
  console.log('insert ->' + reaction);
  db.insert(reaction);
  db.find({}, (errors, docs) => {
    console.log(docs);
  });
  res.json(reaction);
});

router.get('/reset', function(req, res, next) {
  db.remove({}, { multi: true }, function (err, numRemoved) {});
  res.send("done");
});

module.exports = router;
