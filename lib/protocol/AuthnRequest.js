var AuthnRequestType = require("./AuthnRequestType");

var AuthnRequest = module.exports = function AuthnRequest(options) {
  AuthnRequestType.call(this, options);
};
AuthnRequest.prototype = Object.create(AuthnRequestType.prototype);

AuthnRequest.prototype._tagName = "AuthnRequest";
