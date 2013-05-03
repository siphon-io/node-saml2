var crypto = require("crypto");

var Element = require("./Element");

var RequestAbstractType = module.exports = function RequestAbstractType(options) {
  Element.call(this, options);

  this.ID = options.ID || crypto.randomBytes(20).toString("hex");
  this.Version = options.Version || "2.0";
  this.IssueInstant = options.IssueInstant || new Date();
  this.Destination = options.Destination;
  this.Consent = options.Consent;
  this.Issuer = options.Issuer;
};
RequestAbstractType.prototype = Object.create(Element.prototype);

RequestAbstractType.prototype._namespace = "urn:oasis:names:tc:SAML:2.0:protocol";
RequestAbstractType.prototype._tagPrefix = "samlp";

RequestAbstractType.prototype.toXML = function toXML() {
  var root = Element.prototype.toXML.call(this);

  root.setAttribute("ID", this.ID);

  root.setAttribute("Version", this.Version);

  root.setAttribute("IssueInstant", this.IssueInstant.toISOString());

  if (this.Destination) {
    root.setAttribute("Destination", this.Destination);
  }

  if (this.Consent) {
    root.setAttribute("Consent", this.Consent);
  }

  if (this.Issuer) {
    root.appendChild(this.Issuer.toXML());
  }

  return root;
};
