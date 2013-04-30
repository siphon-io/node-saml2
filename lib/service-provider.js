var crypto = require("crypto"),
    xmldom = require("xmldom");

var AuthnRequest = require("./request-authn");

var ServiceProvider = module.exports = function ServiceProvider(options) {
  options = options || {};

  this.entityId = options.entityId || crypto.randomBytes(5).toString("hex");

  this.dom = new xmldom.DOMImplementation();
  this.serialiser = new xmldom.XMLSerializer();
};

ServiceProvider.prototype.createAuthnRequest = function createAuthnRequest(id, time) {
  if (!id) {
    id = crypto.randomBytes(20).toString("hex");
  }

  if (!time) {
    time = new Date();
  }

  return new AuthnRequest(this, id, time);
};
