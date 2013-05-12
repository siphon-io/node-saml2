#!/usr/bin/env node

var http = require("http"),
    url = require("url");

var saml2 = require("./");

var Middleware = function Middleware(options) {
  this.sp = new saml2.ServiceProvider(options.sp);
  this.idp = new saml2.IdentityProvider(options.idp);

  if (Array.isArray(options.transport)) {
    this.outgoingTransport = options.transport[0];
    this.incomingTransport = options.transport[1];
  } else {
    this.incomingTransport = this.outgoingTransport = options.transport;
  }
};

Middleware.prototype.authenticate = function authenticate(req, res, next) {
  if (arguments.length === 0) {
    return this.authenticate.bind(this);
  }

  return this.outgoingTransport.produce(res, this.idp, {request: this.sp.createAuthnRequest()}, function(err) {
    if (err) {
      return next(err);
    }
  });
};

Middleware.prototype.callback = function callback(req, res, next) {
  if (arguments.length === 0) {
    return this.callback.bind(this);
  }

  return this.incomingTransport.consume(req, function(err, body) {
    if (err) {
      return next(err)
    }

    if (!this.idp.verify(body.SAMLResponse)) {
      return next(http_error.Unauthorized("saml response signature was not valid"));
    }

    var statusCodes = ((body.response && body.response.Status && body.response.Status.StatusCode) ? (Array.isArray(body.response.Status.StatusCode) ? body.response.Status.StatusCode : [body.response.Status.StatusCode]) : []).map(function(e) { return e.Value; });

    if (statusCodes[0] !== "urn:oasis:names:tc:SAML:2.0:status:Success") {
      return next(http_error.Unauthorised("expected success status code, got: " + statusCodes[0]));
    }

    console.log(JSON.stringify(body.response, null, 2));

    return next();
  }.bind(this));
};

var middleware = new Middleware({
  sp: {
    entityId: "fknsrsbiz-testing",
  },
  idp: {
    singleSignOnService: "https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php",
    certificate: "-----BEGIN X509 CERTIFICATE-----\nMIICizCCAfQCCQCY8tKaMc0BMjANBgkqhkiG9w0BAQUFADCBiTELMAkGA1UEBhMC\nTk8xEjAQBgNVBAgTCVRyb25kaGVpbTEQMA4GA1UEChMHVU5JTkVUVDEOMAwGA1UE\nCxMFRmVpZGUxGTAXBgNVBAMTEG9wZW5pZHAuZmVpZGUubm8xKTAnBgkqhkiG9w0B\nCQEWGmFuZHJlYXMuc29sYmVyZ0B1bmluZXR0Lm5vMB4XDTA4MDUwODA5MjI0OFoX\nDTM1MDkyMzA5MjI0OFowgYkxCzAJBgNVBAYTAk5PMRIwEAYDVQQIEwlUcm9uZGhl\naW0xEDAOBgNVBAoTB1VOSU5FVFQxDjAMBgNVBAsTBUZlaWRlMRkwFwYDVQQDExBv\ncGVuaWRwLmZlaWRlLm5vMSkwJwYJKoZIhvcNAQkBFhphbmRyZWFzLnNvbGJlcmdA\ndW5pbmV0dC5ubzCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAt8jLoqI1VTlx\nAZ2axiDIThWcAOXdu8KkVUWaN/SooO9O0QQ7KRUjSGKN9JK65AFRDXQkWPAu4Hln\nO4noYlFSLnYyDxI66LCr71x4lgFJjqLeAvB/GqBqFfIZ3YK/NrhnUqFwZu63nLrZ\njcUZxNaPjOOSRSDaXpv1kb5k3jOiSGECAwEAATANBgkqhkiG9w0BAQUFAAOBgQBQ\nYj4cAafWaYfjBU2zi1ElwStIaJ5nyp/s/8B8SAPK2T79McMyccP3wSW13LHkmM1j\nwKe3ACFXBvqGQN0IbcH49hu0FKhYFM/GPDJcIHFBsiyMBXChpye9vBaTNEBCtU3K\njjyG0hRT2mAQ9h+bkPmOvlEo/aH0xR68Z9hw4PF13w==\n-----END X509 CERTIFICATE-----\n",
  },
  transport: [saml2.Transport.Redirect, saml2.Transport.Post],
});

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url, true);

  console.log(new Date(), req.method, uri.path);

  var next = function next(err) {
    if (err) {
      res.writeHead(500);
      res.end(err.message);
      return;
    }

    res.writeHead(200);
    res.end("OK");
  };

  if (uri.pathname === "/") {
    return middleware.authenticate(req, res, next);
  }

  if (uri.pathname === "/SAML2/AssertionConsumer/POST") {
    return middleware.callback(req, res, next);
  }

  res.writeHead(404);
  res.end("not found!");
});

server.listen(3000, function() {
  console.log("");
  console.log("Service provider example now listening!");
  console.log("");
  console.log("Visit http://127.0.0.1:3000/ in your browser and watch the magic!");
  console.log("");
  console.log("--------");
  console.log("");
});
