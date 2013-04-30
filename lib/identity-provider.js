var xmlcrypto = require("xml-crypto");

var IdentityProvider = module.exports = function IdentityProvider(options) {
  this.singleSignOnService = options.singleSignOnService;
  this.certificate = options.certificate;
};

IdentityProvider.prototype.createVerifier = function createVerifier() {
  var verifier = new xmlcrypto.SignedXml();

  verifier.keyInfoProvider = {
    getKeyInfo: function() { return "<X509Data></X509Data>"; },
    getKey: function() { return this.certificate; }.bind(this),
  };

  return verifier;
};

IdentityProvider.prototype.verify = function verify(doc) {
  var verifier = this.createVerifier(),
      signature = xmlcrypto.xpath.SelectNodes(doc, "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];

  verifier.loadSignature(signature.toString());

  return verifier.checkSignature();
};
