var protocol = require("./protocol-generated"),
    Issuer = protocol.getElement("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer"),
    NameIDPolicy = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "NameIDPolicy"),
    AuthnRequest = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || "service-provider-" + Date.now();

  this.issuer = new Issuer({}, this.entityId);
  this.nameIDPolicy = new NameIDPolicy({AllowCreate: "true", Format: "urn:oasis:names:tc:SAML:1.1:nameid-format:transient"});
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest() {
  return new AuthnRequest({
    ID: "request-" + Date.now() + "-" + Math.round(Math.random() * 100000),
    Version: "2.0",
    IssueInstant: (new Date()).toISOString(),
  }, [this.issuer, this.nameIDPolicy]);
};
