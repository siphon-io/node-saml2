exports.IdentityProvider = require("./lib/identity-provider");
exports.ServiceProvider = require("./lib/service-provider");

exports.Transport = {
  Post: require("./lib/transport-post"),
  Redirect: require("./lib/transport-redirect"),
};

exports.Request = {
  Authn: require("./lib/request-authn"),
};
