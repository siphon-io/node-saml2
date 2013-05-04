var xmldom = require("xmldom"),
    c14n = require("xml-c14n");

var Element = module.exports = function Element(options) {
  this._doc = (new xmldom.DOMImplementation()).createDocument();
};

Element.prototype._namespace = null;
Element.prototype._tagName = null;
Element.prototype._tagPrefix = null;

Element.prototype.toXML = function toXML() {
  if (this._namespace) {
    return this._doc.createElementNS(this._namespace, (this._tagPrefix ? this._tagPrefix + ":" : "") + this._tagName);
  } else {
    return this._doc.createElement(this._tagName);
  }
};

Element.prototype.fromXML = function fromXML(node) {
  return this;
};

Element.prototype.toString = function toString() {
  return c14n.exc_c14n.canonicalise(this.toXML());
};
