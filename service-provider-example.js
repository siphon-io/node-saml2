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
  certificate: "-----BEGIN X509 CERTIFICATE-----\nMIICizCCAfQCCQCY8tKaMc0BMjANBgkqhkiG9w0BAQUFADCBiTELMAkGA1UEBhMC\nTk8xEjAQBgNVBAgTCVRyb25kaGVpbTEQMA4GA1UEChMHVU5JTkVUVDEOMAwGA1UE\nCxMFRmVpZGUxGTAXBgNVBAMTEG9wZW5pZHAuZmVpZGUubm8xKTAnBgkqhkiG9w0B\nCQEWGmFuZHJlYXMuc29sYmVyZ0B1bmluZXR0Lm5vMB4XDTA4MDUwODA5MjI0OFoX\nDTM1MDkyMzA5MjI0OFowgYkxCzAJBgNVBAYTAk5PMRIwEAYDVQQIEwlUcm9uZGhl\naW0xEDAOBgNVBAoTB1VOSU5FVFQxDjAMBgNVBAsTBUZlaWRlMRkwFwYDVQQDExBv\ncGVuaWRwLmZlaWRlLm5vMSkwJwYJKoZIhvcNAQkBFhphbmRyZWFzLnNvbGJlcmdA\ndW5pbmV0dC5ubzCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAt8jLoqI1VTlx\nAZ2axiDIThWcAOXdu8KkVUWaN/SooO9O0QQ7KRUjSGKN9JK65AFRDXQkWPAu4Hln\nO4noYlFSLnYyDxI66LCr71x4lgFJjqLeAvB/GqBqFfIZ3YK/NrhnUqFwZu63nLrZ\njcUZxNaPjOOSRSDaXpv1kb5k3jOiSGECAwEAATANBgkqhkiG9w0BAQUFAAOBgQBQ\nYj4cAafWaYfjBU2zi1ElwStIaJ5nyp/s/8B8SAPK2T79McMyccP3wSW13LHkmM1j\nwKe3ACFXBvqGQN0IbcH49hu0FKhYFM/GPDJcIHFBsiyMBXChpye9vBaTNEBCtU3K\njjyG0hRT2mAQ9h+bkPmOvlEo/aH0xR68Z9hw4PF13w==\n-----END X509 CERTIFICATE-----\n",
});

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url, true);

  console.log(new Date(), req.method, uri.path);

  if (uri.pathname === "/") {
    return saml2.Transport.Redirect.produce(res, idp, {request: sp.createAuthnRequest()}, function(err) {
      if (err) {
        return res.end("OH NO ERROR");
      }
    });
  }

  if (uri.pathname === "/SAML2/AssertionConsumer/POST") {
    return saml2.Transport.Post.consume(req, function(err, body) {
      if (err) {
        return res.end("OH NO ERROR");
      }

      if (!idp.verify(body.SAMLResponse)) {
        res.writeHead(403);
        return res.end("uh oh, the saml response was not valid!");
      }

      res.writeHead(200, {
        "content-type": "application/json",
      });

      res.end(JSON.stringify(body.response, null, 2));
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
