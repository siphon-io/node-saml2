var dsig = require("xml-dsig")(),
    pem = require("pem"),
    xpath = require("xpath");

var IdentityProvider = module.exports = function IdentityProvider(options) {
  options = options || {};

  this.singleSignOnService = options.singleSignOnService;
  this.singleLogOutService = options.singleLogOutService || null;
  this.certificate = options.certificate || null;
  this.fingerprint = options.fingerprint || null;
  this.rejectUnsigned = options.rejectUnsigned;

  if (!this.singleSignOnService) {
    throw new Error("singleSignOnService parameter is required");
  }

  if (this.certificate || this.fingerprint) {
    // if we have a certificate or a fingerprint, we almost definitely want to
    // make sure they're correct.
    this.rejectUnsigned = true;
  } else {
    // otherwise just make sure it's a boolean of some description.
    this.rejectUnsigned = !!this.rejectUnsigned;
  }

  // if we're asked to reject unsigned messages, we need to know what signatures
  // are valid.
  if (this.rejectUnsigned && !this.certificate && !this.fingerprint) {
    throw new Error("when rejectUnsigned is specified, either a certificate or a fingerprint is required");
  }
};

IdentityProvider.prototype.verify = function verify(doc, cb) {
  var responseSignatureElement = xpath.select1("/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:protocol' and local-name()='Response']/*[namespace-uri()='http://www.w3.org/2000/09/xmldsig#' and local-name()='Signature']", doc),
      assertionSignatureElement = xpath.select1("/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:protocol' and local-name()='Response']/*[namespace-uri()='urn:oasis:names:tc:SAML:2.0:assertion' and local-name()='Assertion']/*[namespace-uri()='http://www.w3.org/2000/09/xmldsig#' and local-name()='Signature']", doc);

  if (!responseSignatureElement && !assertionSignatureElement) {
    if (this.rejectUnsigned) {
      return cb(Error("no signature element found, but at least one was expected"));
    } else {
      return cb();
    }
  }

  var options = {};

  if (this.certificate) {
    options.keySelector = dsig.createKeySelector("specified", {
      keyInfo: {
        certificate: this.certificate,
      },
    });
  }

  var self = this;
  return dsig.verifySignature(options, assertionSignatureElement || responseSignatureElement, function(err, signatureInfo) {
    if (err) {
      return cb(err);
    }

    if (self.fingerprint) {
      if (!signatureInfo.keyInfo || !signatureInfo.keyInfo.certificate) {
        return cb(Error("couldn't get certificate from signature"));
      }

      return pem.getFingerprint(signatureInfo.keyInfo.certificate, function(err, fingerprintInfo) {
        if (err) {
          return cb(err);
        }

        if (fingerprintInfo.fingerprint !== self.fingerprint) {
          return cb(Error("the certificate that signed this message did not have the fingerprint we expected"));
        }

        return cb(null, signatureInfo);
      });
    } else {
      return cb(null, signatureInfo);
    }
  });
};
