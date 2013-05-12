//
// node-saml2
// ==========
//
// This is the entry point for the library. It's structured so that related
// things are grouped together.
//

// [IdentityProvider](identity-provider.html)
exports.IdentityProvider = require("./lib/identity-provider");
// [ServiceProvider](service-provider.html)
exports.ServiceProvider = require("./lib/service-provider");

// These are the supported transports (or "bindings"). See [this document](http://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)
// for information about them.
exports.Transport = {
  // [PostTransport](transport-post.html)
  Post: require("./lib/transport-post"),
  // [RedirectTransport](transport-redirect.html)
  Redirect: require("./lib/transport-redirect"),
};

// This is a link to the automatically generated protocol definition for SAML
// 2.0. It's based on the `urn:oasis:names:tc:SAML:2.0:protocol` namespace. Take
// a look-see at [this file](./protocol-generated.html) if you're curious!
exports.Protocol = require("./lib/protocol-generated");
