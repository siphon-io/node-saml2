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

      if (!body.samlRequest) {
        res.writeHead(406);
        return res.end("no SAML request found");
      }

      if (!body.samlRequest.name || body.samlRequest.name.key !== "{urn:oasis:names:tc:SAML:2.0:protocol}AuthnRequest") {
        res.writeHead(406);
        return res.end("body is not an AuthnRequest");
      }

      if (!body.samlRequest.value.issuer) {
        res.writeHead(403);
        return res.end("AuthnRequest sent with no issuer");
      }

      if (body.samlRequest.value.issuer.value !== "fknsrsbiz-testing") {
        res.writeHead(403);
        return res.end("invalid issuer for AuthnRequest");
      }

      res.writeHead(200, {
        "content-type": "application/json",
      });

      res.end(JSON.stringify(body.samlRequest, null, 2));
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
