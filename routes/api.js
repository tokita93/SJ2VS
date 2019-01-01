var express = require('express');
var conf = require('config');
var router = express.Router();


/* GET users listing. */
router.get('/config', function(req, res, next) {
  res.json(conf);
});

module.exports = router;
