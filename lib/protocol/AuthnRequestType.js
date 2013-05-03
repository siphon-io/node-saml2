var RequestAbstractType = require("./RequestAbstractType");

var AuthnRequestType = module.exports = function AuthnRequestType(options) {
  RequestAbstractType.call(this, options);

  this.Subject = options.Subject;
  this.NameIDPolicy = options.NameIDPolicy;
  this.Conditions = options.Conditions;
  this.RequestedAuthnContext = options.RequestedAuthnContext;
  this.Scoping = options.Scoping;
  this.ForceAuthn = options.ForceAuthn;
  this.IsPassive = options.IsPassive;
  this.AssertionConsumerIndex = options.AssertionConsumerIndex;
  this.AssertionConsumerServiceURL = options.AssertionConsumerServiceURL;
  this.ProtocolBinding = options.ProtocolBinding;
  this.AttributeConsumingServiceIndex = options.AttributeConsumingServiceIndex;
  this.ProviderName = options.ProviderName;
};
AuthnRequestType.prototype = Object.create(RequestAbstractType.prototype);

AuthnRequestType.prototype.toXML = function toXML() {
  var root = RequestAbstractType.prototype.toXML.call(this);

  if (this.Subject) {
    root.appendChild(this.Subject.toXML());
  }

  if (this.NameIDPolicy) {
    root.appendChild(this.NameIDPolicy.toXML());
  }

  if (this.Conditions) {
    root.appendChild(this.Conditions.toXML());
  }

  if (this.RequestedAuthnContext) {
    root.appendChild(this.RequestedAuthnContext.toXML());
  }

  if (this.Scoping) {
    root.appendChild(this.Scoping.toXML());
  }

  if (this.ForceAuthn) {
    root.setAttribute("ForceAuthn", this.ForceAuthn ? "true" : "false");
  }

  if (this.IsPassive) {
    root.setAttribute("IsPassive", this.IsPassive ? "true" : "false");
  }

  if (this.AssertionConsumerServiceIndex) {
    root.setAttribute("AssertionConsumerServiceIndex", this.AssertionConsumerServiceIndex);
  }

  if (this.AssertionConsumerServiceURL) {
    root.setAttribute("AssertionConsumerServiceURL", this.AssertionConsumerServiceURL);
  }

  if (this.ProtocolBinding) {
    root.setAttribute("ProtocolBinding", this.ProtocolBinding);
  }

  if (this.AttributeConsumingServiceIndex) {
    root.setAttribute("AttributeConsumingServiceIndex", this.AttributeConsumingServiceIndex);
  }

  if (this.ProviderName) {
    root.setAttribute("ProviderName", this.ProviderName);
  }

  return root;
};
