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

// This is the namespace for all the SAML 2.0 protocol messages that node-saml2
// currently knows how to deal with. See [this document](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
// and [this file](./protocol.html) for more information about them.
exports.Protocol = require("./lib/protocol");
