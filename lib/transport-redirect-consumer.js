var url = require("url"),
    xmldom = require("xmldom"),
    zlib = require("zlib");

var Protocol = require("./protocol");

var RedirectConsumer = module.exports = function RedirectConsumer(req, cb) {
  var parser = new xmldom.DOMParser();

  if (req.method !== "GET") {
    return cb(Error("RedirectConsumer only works with GET requests"));
  }

  var uri = url.parse(req.url, true);

  if (!uri.query || (!uri.query.SAMLRequest && !uri.query.SAMLResponse)) {
    return cb(Error("no SAML fields found in query"));
  }

  var data = {};

  var fields = [["SAMLRequest", "request"], ["SAMLResponse", "response"]];

  var next = function next(err) {
    if (err) {
      return cb(err);
    }

    if (!fields.length) {
      return cb(null, data);
    }

    var field = fields.shift();

    if (!uri.query[field[0]]) {
      return next();
    }

    var xml = Buffer(uri.query[field[0]], "base64");

    zlib.inflateRaw(xml, function(err, xml) {
      if (err) {
        return next(err);
      }

      try {
        xml = parser.parseFromString(xml.toString("utf8"));
      } catch (e) {
        return next(e);
      }

      if (!xml) {
        return next(Error("couldn't parse " + field[0] + " field"));
      }

      var obj = Protocol.fromXML(xml.documentElement);

      if (!obj) {
        return next(Error("couldn't figure out how to use a " + xml.documentElement.tagName + " to construct an object"));
      }

      data[field[1]] = data[field[0]] = obj;

      return next();
    }.bind(this));
  }.bind(this);

  next();
};
