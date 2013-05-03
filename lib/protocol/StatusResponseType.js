var Element = require("./Element");

var StatusResponseType = module.exports = function StatusResponseType(options) {
  Element.call(this, options);

  this.id = options.id;
  this.inStatusResponseTypeTo = options.inStatusResponseTypeTo;
  this.version = options.version || "2.0";
  this.issueInstant = options.issueInstant || new Date();
  this.destination = options.destination;
  this.consent = options.consent;
  this.issuer = options.issuer;
  this.status = options.status;

  this._namespace = "urn:oasis:names:tc:SAML:2.0:protocol";
};
StatusResponseType.prototype = Object.create(Element.prototype);

StatusResponseType.prototype.toXML = function toXML() {
  var root = Element.prototype.toXML.call(this);

  root.setAttribute("ID", this.id);

  if (this.inResponseTo) {
    root.setAttribute("InResponseTo", this.inResponseTo);
  }

  root.setAttribute("Version", this.version);

  root.setAttribute("IssueInstant", this.issueInstant.toISOString());

  if (this.destination) {
    root.setAttribute("Destination", this.destination);
  }

  if (this.consent) {
    root.setAttribute("Consent", this.consent);
  }

  if (this.issuer) {
    root.appendChild(this.issuer.toXML());
  }

  return root;
};
