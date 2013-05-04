var crypto = require("crypto");

var Element = require("./Element"),
    Issuer = require("./Issuer");

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

RequestAbstractType.prototype.fromXML = function fromXML(node) {
  Element.prototype.fromXML.call(this, node);

  if (node.hasAttribute("ID")) {
    this.ID = node.getAttribute("ID");
  }

  if (node.hasAttribute("Version")) {
    this.Version = node.getAttribute("Version");
  }

  if (node.hasAttribute("IssueInstant")) {
    this.IssueInstant = new Date(node.getAttribute("IssueInstant"));
  }

  if (node.hasAttribute("Destination")) {
    this.Destination = node.getAttribute("Destination");
  }

  if (node.hasAttribute("Consent")) {
    this.Consent = node.getAttribute("Consent");
  }

  var issuerElement = node.getElementsByTagNameNS("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer")[0];
  if (issuerElement && issuerElement.parentNode === node) {
    this.Issuer = (new Issuer({})).fromXML(issuerElement);
  }

  return this;
};
