var dsig = require("xml-dsig");

var IdentityProvider = module.exports = function IdentityProvider(options) {
  this.singleSignOnService = options.singleSignOnService;
  this.singleLogOutService = options.singleLogOutService;
  this.certificate = options.certificate;
};

IdentityProvider.prototype.verify = function verify(doc) {
  var signature = doc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature")[0];

  return dsig.verifySignature(doc.documentElement, signature, {
    signatureOptions: {
      publicKey: this.certificate,
    },
  });
};
