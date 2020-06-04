// libraries
const express = require('express'),
      fs      = require('fs'),
      https   = require('https'),
      morgan  = require('morgan');

// application configuration/environment
const env    = process.env,
      prefix = (env.PREFIX || '');

// ssl certificate
const sslCert = fs.readFileSync('/opt/app-root/src/ssl/tls.crt', 'utf8'),
      sslKey  = fs.readFileSync('/opt/app-root/src/ssl/tls.key', 'utf8');

// API module
const api = require('./api.js');

// server instance
var app = express();

// middlewares
app.use(morgan(':remote-addr (:req[Forwarded]) - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// api module under /api prefix
app.use(prefix, api);

// start server
var port = env.PORT || 8443,
    ip   = env.IP   || '0.0.0.0';

https.createServer({
  key: sslKey,
  cert: sslCert
}, app)
.listen(port, function () {
  console.log('API running on http://%s:%s%s', ip, port, prefix);
});
