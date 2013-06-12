var dsig = require("xml-dsig");

var protocol = require("./protocol-generated"),
    Issuer = protocol.getElement("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer"),
    NameID = protocol.getElement("urn:oasis:names:tc:SAML:2.0:assertion", "NameID"),
    AuthnRequest = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest"),
    LogoutRequest = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "LogoutRequest"),
    NameIDPolicy = protocol.getElement("urn:oasis:names:tc:SAML:2.0:protocol", "NameIDPolicy");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || "service-provider-" + Date.now();
  this.privateKey = options.privateKey || null;
  this.certificate = options.certificate || null;

  this.issuer = new Issuer({}, this.entityId);
  this.nameIDPolicy = new NameIDPolicy({AllowCreate: "true", Format: "urn:oasis:names:tc:SAML:1.1:nameid-format:transient"});
};

ServiceProvider.prototype.sign = function sign(xml) {
  if (!this.privateKey) {
    return xml;
  }

  return dsig.insertEnvelopedSignature(xml, {
    signatureOptions: {
      privateKey: this.privateKey,
    },
  });
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest() {
  return new AuthnRequest({
    ID: "request-" + Date.now() + "-" + Math.round(Math.random() * 100000),
    Version: "2.0",
    IssueInstant: (new Date()).toISOString(),
  }, [this.issuer, this.nameIDPolicy]);
};

ServiceProvider.prototype.createLogoutRequest = function createLogoutRequest(name) {
  return new LogoutRequest({
    ID: "request-" + Date.now() + "-" + Math.round(Math.random() * 100000),
    Version: "2.0",
    IssueInstant: (new Date()).toISOString(),
  }, [this.issuer, new NameID({}, name)]);
};
