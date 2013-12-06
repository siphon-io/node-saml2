var querystring = require("querystring"),
    zlib = require("zlib"),
    c14n = require("xml-c14n")();

var canonicaliser = c14n.createCanonicaliser("http://www.w3.org/2001/10/xml-exc-c14n#WithComments");

var RedirectProducer = module.exports = function RedirectProducer(res, idp, fields, cb) {
  var keys = Object.keys(fields);

  var data = {};

  var next = function next(err) {
    if (err) {
      return cb(err);
    }

    if (keys.length === 0) {
      data.SAMLEncoding = "urn:oasis:names:tc:SAML:2.0:bindings:URL-Encoding:DEFLATE";

      res.writeHead(302, {
        location: idp.singleSignOnService + "?" + querystring.stringify(data),
      });

      res.end();

      return cb();
    }

    var from, to;

    from = to = keys.shift();

    if (from === "request")    { to = "SAMLRequest";  }
    if (from === "response")   { to = "SAMLResponse"; }
    if (from === "relayState") { to = "RelayState";   }

    if (Buffer.isBuffer(fields[from])) {
      data[to] = fields[from].toString();
      return next();
    }

    if (typeof fields[from] === "string") {
      data[to] = fields[from];
      return next();
    }

    if (typeof fields[from] === "object" && typeof fields[from].toDocument === "function") {
      return canonicaliser.canonicalise(fields[from].toDocument(), function(err, xml) {
        if (err) {
          return cb(err);
        }

        return zlib.deflateRaw(xml, function(err, deflated) {
          if (err) {
            return cb(err);
          }

          data[to] = deflated.toString("base64");

          return next();
        });
      });
    }

    return next(Error("can't handle type " + (typeof fields[from]) + " found in field " + from));
  };

  next();
};
