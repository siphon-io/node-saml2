var querystring = require("querystring"),
    xmldom = require("xmldom");

var protocol = require("./protocol");

var PostConsumer = module.exports = function PostConsumer(req, cb) {
  if (req.method !== "POST") {
    return cb(Error("PostConsumer only works with POST requests"));
  }

  if (!req.headers || req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    return cb(Error("PostConsumer only reads x-www-form-urlencoded bodies"));
  }

  var buffer = [];

  req.on("data", function(chunk) {
    buffer.push(chunk);
  });

  req.on("end", function() {
    buffer = Buffer.concat(buffer).toString();

    var parsed = querystring.parse(buffer);

    if (!parsed || (!parsed.SAMLRequest && !parsed.SAMLResponse)) {
      return cb(Error("no SAML fields found in body"));
    }

    var data = {};

    var xml = null;
    var fields = [["SAMLRequest", "samlRequestXml", "samlRequest"], ["SAMLResponse", "samlResponseXml", "samlResponse"]];

    for (var k in fields) {
      if (!parsed[fields[k][0]]) {
        continue;
      }

      xml = Buffer(parsed[fields[k][0]], "base64").toString("utf8");

      try {
        xml = new xmldom.DOMParser().parseFromString(xml);
      } catch (e) {
        return cb(e);
      }

      if (!xml) {
        return cb(Error("couldn't parse " + fields[k][0] + " field"));
      }

      try {
        var obj = protocol.fromDocument(xml.documentElement);
      } catch (e) {
        return cb(e);
      }

      if (!obj) {
        return cb(Error("couldn't figure out how to use a " + xml.documentElement.tagName + " to construct an object"));
      }

      data[fields[k][1]] = xml;
      data[fields[k][2]] = obj;
    }

    cb(null, data);
  });
};
