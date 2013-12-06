var Jsonix = require("jsonix-smart");

var context = module.exports = new Jsonix.SmartContext([
  require("./mappings/org_w3__2000__09_xmldsig").org_w3__2000__09_xmldsig,
  require("./mappings/org_w3__2001__04_xmlenc").org_w3__2001__04_xmlenc,
  require("./mappings/oasis_names_tc_saml__2_0_assertion").oasis_names_tc_saml__2_0_assertion,
  require("./mappings/oasis_names_tc_saml__2_0_metadata").oasis_names_tc_saml__2_0_metadata,
  require("./mappings/oasis_names_tc_saml__2_0_protocol").oasis_names_tc_saml__2_0_protocol,
  require("./mappings/oasis_names_tc_xacml__3_0_core_schema_wd_17").oasis_names_tc_xacml__3_0_core_schema_wd_17,
]);
