#!/usr/bin/env node

//
// This is set up to point at openidp.feide.no with the fknsrsbiz-testing idp
// instance. You'll probably want to set your own up, or something.
//
// If you want.
//
// I'm not judging you.
//

var http = require("http"),
    url = require("url");

var saml2 = require("./");

var sp = new saml2.ServiceProvider({
  entityId: "fknsrsbiz-testing",
});

var idp = new saml2.IdentityProvider({
  singleSignOnService: "https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php",
  fingerprint: "C9:ED:4D:FB:07:CA:F1:3F:C2:1E:0F:EC:15:72:04:7E:B8:A7:A4:CB",
});

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url, true);

  console.log(new Date(), req.method, uri.path);

  if (uri.pathname === "/") {
    return saml2.Transport.Redirect.produce(res, idp, {request: sp.createAuthnRequest()}, function(err) {
      if (err) {
        res.writeHead(500);
        return res.end("OH NO ERROR");
      }
    });
  }

  if (uri.pathname === "/SAML2/AssertionConsumer/POST") {
    return saml2.Transport.Post.consume(req, function(err, body) {
      if (err) {
        res.writeHead(500);
        return res.end("Error reading assertion");
      }

      var onVerified = function onVerified(err, valid) {
        if (err) {
          res.writeHead(500);
          return res.end("Error verifying signature");
        }

        if (!valid) {
          res.writeHead(403);
          return res.end("uh oh, the saml response's signature was not valid!");
        }

        res.writeHead(200, {
          "content-type": "application/json",
        });

        res.end(JSON.stringify(body.samlResponse, null, 2));
      };

      if (idp.certificate) {
        return idp.verify(body.samlResponseXml, onVerified);
      } else {
        return onVerified(null, true);
      }
    });
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
