var dsig = require("xml-dsig")(),
    xpath = require("xpath");

var IdentityProvider = module.exports = function IdentityProvider(options) {
  this.singleSignOnService = options.singleSignOnService;
  this.singleLogOutService = options.singleLogOutService;
  this.certificate = options.certificate;
};

IdentityProvider.prototype.verify = function verify(doc, cb) {
  if (!this.certificate) {
    setImmediate(cb);

    return;
  }

  var responseSignatureElement = xpath.select1("/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:protocol' and local-name()='Response']/*[namespace-uri()='http://www.w3.org/2000/09/xmldsig#' and local-name()='Signature']", doc),
      assertionSignatureElement = xpath.select1("/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:protocol' and local-name()='Response']/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:assertion' and local-name()='Assertion']/*[namespace-uri()='http://www.w3.org/2000/09/xmldsig#' and local-name()='Signature']", doc);

  if (!responseSignatureElement && !assertionSignatureElement) {
    return cb(Error("no signature element found, but at least one was expected"));
  }

  var options = {
    keySelector: dsig.createKeySelector("specified", {
      keyInfo: {
        certificate: this.certificate,
      },
    }),
  };

  dsig.verifySignature(assertionSignatureElement || responseSignatureElement, options, cb);
};
