var protocol = require("./protocol-generated"),
    Issuer = protocol.getElement("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer"),
    AuthnRequest = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || "service-provider-" + Date.now();

  this.issuer = new Issuer({}, this.entityId);
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest() {
  return new AuthnRequest({
    ID: "request-" + Date.now() + "-" + Math.round(Math.random() * 100000),
    Version: "2.0",
    IssueInstant: (new Date()).toISOString(),
  }, [this.issuer]);
};
