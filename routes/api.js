var express = require('express');
var csv = require('csv-express');
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
  }  
}, 3000);
currentSpeakerId = JSON.parse(fs.readFileSync(curentStatusFile, 'utf8')).speakerId;

router.get('/config', function(req, res, next) {
  res.json(conf);
});

router.get('/status', function(req, res, next) {
  res.json(conf);
});

router.post('/speaker', function(req, res, next) {
  currentSpeakerId = req.body.speakerId;
  var saveText = { 'speakerId': currentSpeakerId};
  fs.writeFileSync(curentStatusFile, JSON.stringify(saveText), 'utf8');
  res.sendStatus(201);
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
  var count = {};
  conf.category.forEach(element => {
    count[element.id] = 0;
  });
  db.find({"speakerId" : currentSpeakerId}, {multi:true}, function(err, docs) {
    var sum = docs.reduce(function(result, current) {
      result[current.categoryId] = result[current.categoryId] + 1;
      return result
    }, count);
    var resultArray = [];
    Object.keys(sum).forEach(function(data) {resultArray.push({"id" : data, "count": sum[data]})});
    res.json({"speakerId": currentSpeakerId, "monitor" : resultArray});
  });
});

router.get('/result.json', function(req, res, next) {
  var count = {};
  conf.category.forEach(element => {
    count[element.id] = 0;
  });
  db.find({}, {multi:true}, function(err, docs) {
    res.json(docs);
  });
});

router.get('/result.csv', function(req, res, next) {
  var count = {};
  conf.category.forEach(element => {
    count[element.id] = 0;
  });
  db.find({}, {multi:true}, function(err, docs) {
    res.csv(docs, true);
  });
});


router.get('/reset', function(req, res, next) {
  db.remove({}, { multi: true }, function (err, numRemoved) {});
  res.send("reset done");
});


module.exports = router;
