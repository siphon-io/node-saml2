#!/usr/bin/env node

var http = require("http"),
    url = require("url");

var saml2 = require("./");

var protocol = saml2.Protocol,
    Response = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "Response");

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url, true);

  console.log(new Date(), req.method, uri.path);

  if (uri.pathname === "/saml2/sso/Redirect") {
    return saml2.Transport.Redirect.consume(req, function(err, body) {
      if (err) {
        return res.end("OH NO ERROR");
      }

      if (!body.request) {
        res.writeHead(406);
        return res.end("no SAML request found");
      }

      if (!(body.request instanceof saml2.Protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest"))) {
        res.writeHead(406);
        return res.end("body is not an AuthnRequest");
      }

      if (!body.request.Issuer) {
        res.writeHead(403);
        return res.end("AuthnRequest sent with no issuer");
      }

      if (body.request.Issuer._content !== "fknsrsbiz-testing") {
        res.writeHead(403);
        return res.end("invalid issuer for AuthnRequest");
      }

      var issuer = new Issuer({}, "fknsrsbiz-idp"),
          status = new Status({}, [new StatusCode({Value: "urn:oasis:names:tc:SAML:2.0:status:Success"})]);

      var subject = new Subject({}, [
        new NameID({Format: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"}, "not@a.real.person"),
      ]);

      var assertion = new Assertion({
        Version: "2.0",
        ID: Date.now() + "-" + Math.round(Math.random() * 100000),
        IssueInstant: (new Date()).toISOString(),
      }, [issuer, subject]);

      var response = new Response({
        Version: "2.0",
        IssueInstant: (new Date()).toISOString(),
        Destination: "http://127.0.0.1:3000/SAML2/AssertionConsumer/POST",
      }, [issuer, status, assertion]);

      saml2.Transport.Post.produce(res, "http://127.0.0.1:3000/SAML2/AssertionConsumer/POST", {
        SAMLResponse: new Response({
          Version: 
        }, ),
      }, function(err) {
      });

      res.writeHead(200, {
        "content-type": "application/json",
      });

      res.end(JSON.stringify(body.request, null, 2));
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
