// [AuthnRequest](./AuthnRequest.html)
var AuthnRequest = exports.AuthnRequest = require("./protocol/AuthnRequest");

// [AuthnRequestType](./AuthnRequestType.html)
var AuthnRequestType = exports.AuthnRequestType = require("./protocol/AuthnRequestType");

// [Element](./Element.html)
var Element = exports.Element = require("./protocol/Element");

// [Issuer](./Issuer.html)
var Issuer = exports.Issuer = require("./protocol/Issuer");

// [NameIDType](./NameIDType.html)
var NameIDType = exports.NameIDType = require("./protocol/NameIDType");

// [RequestAbstractType](./RequestAbstractType.html)
var RequestAbstractType = exports.RequestAbstractType = require("./protocol/RequestAbstractType");

// [StatusResponseType](./StatusResponseType.html)
var StatusResponseType = exports.StatusResponseType = require("./protocol/StatusResponseType");

// [SubjectType](./SubjectType.html)
var SubjectType = exports.SubjectType = require("./protocol/SubjectType");

var fromXML = exports.fromXML = function fromXML(node) {
  var tagName = (node.namespaceURI ? node.namespaceURI + ":" : "") + node.localName;

  if (tagName === "urn:oasis:names:tc:SAML:2.0:protocol:AuthnRequest") {
    return (new AuthnRequest({})).fromXML(node);
  }

  return null;
};
