var express = require('express');
var conf = require('config');
var fs = require('fs');
var router = express.Router();

var DataStore = require('nedb');
var db = new DataStore({
  filename: "db/storage.db",
  autoload: true
});

var curentStatusFile = 'public/data/current.json';

var currentSpeakerId = "";

//手動で変更された場合のため、3秒置きに設定ファイルを確認する
setInterval(function() {
  try {
    currentSpeakerId = JSON.parse(fs.readFileSync(curentStatusFile, 'utf8')).speakerId;
  } catch(e) {
    console.log(e);
  }  
}, 3000);

router.get('/config', function(req, res, next) {
  res.json(conf);
});

router.get('/status', function(req, res, next) {
  res.json(conf);
});

router.post('/speaker', function(req, res, next) {
  currentSpeakerId = req.body.speakerId;
  var saveText = { 'speakerId': currentSpeakerId};
  fs.writeFileSync(curentStatusFile, saveText, 'utf8');
});

router.post('/reaction', function(req, res, next) {
  var reaction = {
    "speakerId" : req.body.speakerId,
    "name": req.body.name,
    "categoryId": req.body.categoryId
  };
  db.insert(reaction);
  res.json(reaction);
});

router.get('/monitor', function(req, res, next) {
  db.find({"speakerId" : currentSpeakerId}, {multi:true}, function(err, docs) {
    var sum = docs.reduce(function(result, current) {
      var currentCount = result[current.categoryId];
      if (typeof currentCount === 'undefined') {
        currentCount = 0;
      } 
      result[current.categoryId] = currentCount + 1;
      return result
    }, {});
    var resultArray = [];
    Object.keys(sum).forEach(function(data) {resultArray.push({"id" : data, "count": sum[data]})});
    res.json({"speakerId": currentSpeakerId, "monitor" : resultArray});
  });
});


router.get('/reset', function(req, res, next) {
  db.remove({}, { multi: true }, function (err, numRemoved) {});
  res.send("reset done");
});

module.exports = router;
