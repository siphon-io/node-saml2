var dsig = require("xml-dsig")(),
    randomId = require("proquint-random-id");

var protocol = require("./protocol"),
    Issuer = protocol.getClass("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer"),
    NameID = protocol.getClass("urn:oasis:names:tc:SAML:2.0:assertion", "NameID"),
    AuthnRequest = protocol.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest"),
    LogoutRequest = protocol.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "LogoutRequest"),
    NameIDPolicy = protocol.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "NameIDPolicy");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || "service-provider-" + randomId();
  this.privateKey = options.privateKey || null;
  this.certificate = options.certificate || null;

  this.issuer = new Issuer({value: this.entityId});
  this.nameIDPolicy = new NameIDPolicy({allowCreate: true, format: "urn:oasis:names:tc:SAML:1.1:nameid-format:transient"});
};

ServiceProvider.prototype.sign = function sign(xml, cb) {
  if (!this.privateKey) {
    setImmediate(function() {
      return cb(null, xml);
    });

    return;
  }

  var options = {
    signatureMethod: dsig.createSignatureMethod("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256", {
      keyInfo: {
        privateKey: this.privateKey,
        certificate: this.certificate,
      },
    }),
  };

  dsig.signAndInsert(xml, options, cb);
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest() {
  return new AuthnRequest({
    id: "request-" + Date.now() + "-" + randomId(),
    version: "2.0",
    issueInstant: (new Date()).toISOString(),
    issuer: this.issuer,
    nameIDPolicy: this.nameIDPolicy,
  });
};

ServiceProvider.prototype.createLogoutRequest = function createLogoutRequest(name) {
  return new LogoutRequest({
    id: "request-" + Date.now() + "-" + randomId(),
    version: "2.0",
    issueInstant: (new Date()).toISOString(),
    issuer: this.issuer,
    nameID: new NameID({value: name}),
  });
};
