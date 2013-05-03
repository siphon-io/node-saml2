var NameIDType = require("./NameIDType");

var Issuer = module.exports = function Issuer(options) {
  NameIDType.call(this, options);
};
Issuer.prototype = Object.create(NameIDType.prototype);

Issuer.prototype._tagName = "Issuer";
