var Element = require("./Element");

var SubjectType = module.exports = function SubjectType(options) {
  Element.call(this, options);

  this.SubjectConfirmation = options.SubjectConfirmation || [];

  this.BaseID = options.BaseID;
  this.NameID = options.NameID;
  this.EncryptedID = options.EncryptedID;
};
SubjectType.prototype = Object.create(Element.prototype);

SubjectType.prototype.toXML = function toXML() {
  var root = Element.prototype.toXML.call(this);

  for (var i=0;i<this.SubjectConfirmation.length;++i) {
    root.appendChild(this.SubjectConfirmation[i].toXML());
  }

  if (this.BaseID) {
    root.appendChild(this.BaseID.toXML());
  } else if (this.NameID) {
    root.appendChild(this.NameID.toXML());
  } else if (this.EncryptedID) {
    root.appendChild(this.EncryptedID.toXML());
  }

  return root;
};
