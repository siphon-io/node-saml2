var Issuer = require("./protocol/Issuer"),
    AuthnRequest = require("./protocol/AuthnRequest");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || crypto.randomBytes(5).toString("hex");

  this.issuer = new Issuer({_content: this.entityId});
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest() {
  return new AuthnRequest({
    Issuer: this.issuer,
  });
};
