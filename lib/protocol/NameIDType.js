var Element = require("./Element");

var NameIDType = module.exports = function NameIDType(options) {
  Element.call(this, options);

  this.NameQualifier = options.NameQualifier;
  this.SPNameQualifier = options.SPNameQualifier;
  this.Format = options.Format;
  this.SPProvidedID = options.SPProvidedID;

  this._content = options._content;
};
NameIDType.prototype = Object.create(Element.prototype);

NameIDType.prototype._namespace = "urn:oasis:names:tc:SAML:2.0:assertion";
NameIDType.prototype._tagPrefix = "saml";

NameIDType.prototype.toXML = function toXML() {
  var root = Element.prototype.toXML.call(this);

  if (this.NameQualifier) {
    root.setAttribute("NameQualifier", this.NameQualifier);
  }

  if (this.SPNameQualifier) {
    root.setAttribute("SPNameQualifier", this.SPNameQualifier);
  }

  if (this.Format) {
    root.setAttribute("Format", this.Format);
  }

  if (this.SPProvidedID) {
    root.setAttribute("SPProvidedID", this.SPProvidedID);
  }

  root.appendChild(this._doc.createTextNode(this._content));

  return root;
};

NameIDType.prototype.fromXML = function fromXML(node) {
  Element.prototype.fromXML.call(this, node);

  if (node.hasAttribute("NameQualifier")) {
    this.NameQualifier = node.getAttribute("NameQualifier");
  }

  if (node.hasAttribute("SPNameQualifier")) {
    this.SPNameQualifier = node.getAttribute("SPNameQualifier");
  }

  if (node.hasAttribute("Format")) {
    this.Format = node.getAttribute("Format");
  }

  if (node.hasAttribute("SPProvidedID")) {
    this.SPProvidedID = node.getAttribute("SPProvidedID");
  }

  if (node.childNodes.length > 0 && node.childNodes[0].nodeType === 3) {
    this._content = node.childNodes[0].data;
  }

  return this;
};
