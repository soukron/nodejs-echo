// libraries
const express = require('express');

// application configuration/environment
const env     = process.env,
      version = 'v2';

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

// echo service (deprecated in v2, warn the user)
router.get('/echo/:msg?', function (req, res) {
  var returnData = {result: 'warning', reason: 'this endpoint is deprecated, use say/ instead', msg: (req.params.msg || '')};
  res.status(200).send(returnData);
});

// say service
router.get('/say/:msg?', function (req, res) {
  if (req.params.msg)
    var returnData = {result: 'ok', msg: req.params.msg };
  else
    var returnData = {result: 'error', reason: 'No message provided'};

  res.status(200).send(returnData);
});

// module export
module.exports = router;
