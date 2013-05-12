var querystring = require("querystring"),
    zlib = require("zlib");

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

    if (typeof fields[from] === "string") {
      data[to] = fields[from];
      return next();
    }

    if (typeof fields[from] === "object") {
      return zlib.deflateRaw(fields[from].toString(), function(err, deflated) {
        if (err) {
          return cb(err);
        }

        data[to] = deflated.toString("base64");

        return next();
      });
    }

    return next(Error("can't handle type " + (typeof fields[from]) + " found in field " + from));
  };

  next();
};
