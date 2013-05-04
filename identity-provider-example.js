#!/usr/bin/env node

var http = require("http"),
    url = require("url");

var saml2 = require("./");

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url, true);

  console.log(new Date(), req.method, uri.path);

  if (uri.pathname === "/saml2/sso/Redirect") {
    return saml2.Transport.Redirect.consume(req, function(err, body) {
      if (err) {
        return res.end("OH NO ERROR");
      }

      res.writeHead(200, {
        "content-type": "text/xml",
      });

      res.end(body.SAMLRequest.toString());
    });
  }

  res.writeHead(404);
  res.end("not found!");
});

server.listen(3001, function() {
  console.log("");
  console.log("Identity provider example now listening!");
  console.log("");
  console.log("Use http://127.0.0.1:3001/saml2/sso/Redirect as an identity provider!");
  console.log("");
  console.log("--------");
  console.log("");
});
