var AuthnRequest = module.exports = function AuthnRequest(serviceProvider, id, time) {
  this.serviceProvider = serviceProvider;
  this.id = id;
  this.time = time;
};

AuthnRequest.prototype.toXml = function toXml() {
  var doc = this.serviceProvider.dom.createDocument();

  var root = doc.createElementNS("urn:oasis:names:tc:SAML:2.0:protocol", "samlp:AuthnRequest");
  root.setAttribute("xmlns:samlp", "urn:oasis:names:tc:SAML:2.0:protocol");
  root.setAttribute("xmlns:saml", "urn:oasis:names:tc:SAML:2.0:assertion");
  root.setAttribute("ID", this.id);
  root.setAttribute("Version", "2.0");
  root.setAttribute("IssueInstant", this.time.toISOString());
  root.setAttribute("AssertionConsumerServiceIndex", "0");
  doc.appendChild(root);

  var issuer = doc.createElementNS("urn:oasis:names:tc:SAML:2.0:assertion", "saml:Issuer");
  issuer.appendChild(doc.createTextNode(this.serviceProvider.entityId));
  root.appendChild(issuer);

  var nameIdPolicy = doc.createElementNS("urn:oasis:names:tc:SAML:2.0:protocol", "samlp:NameIDPolicy");
  nameIdPolicy.setAttribute("AllowCreate", "true");
  nameIdPolicy.setAttribute("Format", "urn:oasis:names:tc:SAML:2.0:nameid-format:transient");
  root.appendChild(nameIdPolicy);

  return doc;
};

AuthnRequest.prototype.toString = function toString() {
  return this.serviceProvider.serialiser.serializeToString(this.toXml());
};
