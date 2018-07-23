// libraries
const express = require('express');

// application configuration/environment
const env     = process.env,
      version = 'v1';

// router instance
var router = express.Router();

// root url
router.get('/', function (req, res) {
  res.status(200).end();
});

// readiness test
router.get('/health', function (req, res) {
  var returnData = {result: 'ok', version: version};
  res.status(200).send(returnData);
});

// echo service
router.get('/echo/:msg?', function (req, res) {
  var returnData = {result: 'ok', msg: (req.params.msg || '')};
  res.status(200).send(returnData);
});

// module export
module.exports = router;
