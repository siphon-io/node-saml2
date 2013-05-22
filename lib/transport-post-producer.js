var PostProducer = module.exports = function PostProducer(res, target, fields, cb) {
  var keys = Object.keys(fields);

  var data = {};

  var next = function next(err) {
    if (err) {
      return cb(err);
    }

    if (keys.length === 0) {
      var html = [];

      html.push("<html><body><form id=\"saml\" action=\"" + target + "\">");

      Object.keys(data).filter(function(e) { return Object.prototype.hasOwnProperty.call(data, e); }).forEach(function(k) {
        html.push("<input type=\"hidden\" value=\"" + data[k].replace(/"/g, "\\\"") + "\">");
      });

      html.push("</form></body></html>");

      res.writeHead(200, {"content-type": "text/plain"});
      res.write(html.join(""));
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
      data[to] = fields[from].toString();
      return next();
    }

    return next(Error("can't handle type " + (typeof fields[from]) + " found in field " + from));
  };

  next();
};
