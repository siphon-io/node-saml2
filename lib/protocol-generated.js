var xmldom = require("xmldom"),
    c14n = require("xml-c14n");

// this is where we'll keep all our schema definitions
var definitions = module.exports = {};

// here's an easy interface for getting a defined element/type
definitions.getElement = function getElement(namespace, tagName) {
  return this[[namespace, tagName]];
};

// this automatically finds the right element/type and creates an instance of
// it, filling it with the information from `node`
definitions.fromXML = function fromXML(node) {
  return (new (this.getElement(node.namespaceURI, node.localName))).fromXML(node);
};

// base class for elements - contains a DOM document for creating XML elements
var BaseElement = function BaseElement(attributes, content) {
  this._document = (new xmldom.DOMImplementation()).createDocument();
};

// pretty self-explanatory. creates a new DOM element with the correct namespace
// and local name.
BaseElement.prototype.toXML = function toXML() {
  var node = this._document.createElementNS(this.namespace, this.tagName);

  return node;
};

// no-op! (for now!)
BaseElement.prototype.fromXML = function fromXML(node) {
};

// we output "exclusive" canonicalised XML to ensure namespaces and such are
// represented correctly
BaseElement.prototype.toString = function toString() {
  return c14n.exc_c14n.canonicalise(this.toXML());
};

// a simple element is one containing only text nodes
var BaseSimpleElement = function BaseSimpleElement(attributes, content) {
  BaseElement.call(this, attributes, content);

  this._content = content;
};
BaseSimpleElement.prototype = Object.create(BaseElement.prototype);

// `toJSON` is called when you do `JSON.stringify(object)` - it strips out all
// the needless internal junk
BaseSimpleElement.prototype.toJSON = function toJSON() {
  var res = Object.keys(this).filter(function(e) {
    return Object.prototype.hasOwnProperty.call(this, e) && e[0] !== "_";
  }.bind(this)).concat(["_content"]).reduce(function(i, v) {
    i[v] = this[v];
    return i;
  }.bind(this), {});

  if (Object.keys(res).length === 1) {
    return res._content;
  } else {
    return res;
  }
};

// this is the first meaningful step in the `toXML` chain for simple elements.
// the content of the element is added as a text node child of its DOM element.
BaseSimpleElement.prototype.toXML = function toXML() {
  var node = BaseElement.prototype.toXML.call(this);

  node.appendChild(this._document.createTextNode(this._content));

  return node;
};

// pull out the text data of `node`'s first child
BaseSimpleElement.prototype.fromXML = function fromXML(node) {
  BaseElement.prototype.fromXML.call(this, node);

  this._content = node.childNodes[0] ? node.childNodes[0].data : "";

  return this;
};

// base class for complex elements. a complex element is one which can contain
// other elements.
var BaseComplexElement = function BaseComplexElement(attributes, content) {
  BaseElement.call(this, attributes, content);

  this._content = content || [];
};
BaseComplexElement.prototype = Object.create(BaseElement.prototype);

// same as `toJSON` on `BaseSimpleElement`. this just strips out useless stuff.
BaseComplexElement.prototype.toJSON = function toJSON() {
  return Object.keys(this).filter(function(e) {
    return Object.prototype.hasOwnProperty.call(this, e) && e[0] !== "_";
  }.bind(this)).reduce(function(i, v) {
    i[v] = this[v];
    return i;
  }.bind(this), {});
};

// pretty easy to see what's going on here. take note that it operates on an
// array. this is to preserve the correct ordering of child elements.
BaseComplexElement.prototype.toXML = function toXML() {
  var node = BaseElement.prototype.toXML.call(this);

  var content = Array.isArray(this._content) ? this._content : [this._content];

  content.forEach(function(child) {
    node.appendChild(child.toXML());
  });

  return node;
};

// this goes through and recursively tries to instantiate objects for all the
// child elements. so long as we have schema definitions for them, and they obey
// their schema specifications properly, magic happens and we end up with
// objects.
BaseComplexElement.prototype.fromXML = function fromXML(node) {
  BaseElement.prototype.fromXML.call(this, node);

  [].slice.call(node.childNodes).forEach(function(child) {
    var k = [child.namespaceURI, child.localName].join(",");

    if (definitions[k]) {
      var e = (new definitions[k]).fromXML(child);

      this._content.push(e);

      if (typeof this[e.tagName] === "undefined") {
        this[e.tagName] = [];
      }

      this[e.tagName].push(e);
    }
  }.bind(this));

  Object.keys(this).forEach(function(k) {
    if (Array.isArray(this[k]) && this[k].length === 1) {
      this[k] = this[k][0];
    }
  }.bind(this));

  return this;
};

// these are built-in XML types. we don't have to do anything special here...
// not until we want to start validating stuff, anyway.
["http://www.w3.org/2001/XMLSchema,anyType", "http://www.w3.org/2001/XMLSchema,anyURI", "http://www.w3.org/2001/XMLSchema,base64Binary", "http://www.w3.org/2001/XMLSchema,boolean", "http://www.w3.org/2001/XMLSchema,dateTime", "http://www.w3.org/2001/XMLSchema,ID", "http://www.w3.org/2001/XMLSchema,integer", "http://www.w3.org/2001/XMLSchema,NCName", "http://www.w3.org/2001/XMLSchema,nonNegativeInteger", "http://www.w3.org/2001/XMLSchema,string", "http://www.w3.org/2001/XMLSchema,unsignedShort"].forEach(function(type) {
  definitions[type] = BaseSimpleElement;
});

// okay, everything from here on out is generated automatically. if you want to
// keep reading, knock yourself out, but it's likely to be pretty boring.

;

// generated from RequestAbstractType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"] = (function() {
  var base = BaseComplexElement;

  var x = function RequestAbstractType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["ID"] = attributes["ID"];
    this["Version"] = attributes["Version"];
    this["IssueInstant"] = attributes["IssueInstant"];
    this["Destination"] = attributes["Destination"];
    this["Consent"] = attributes["Consent"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequestAbstractType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }
    if (typeof this["Version"] !== "undefined" && this["Version"] !== null) {
      node.setAttribute("Version", this["Version"]);
    }
    if (typeof this["IssueInstant"] !== "undefined" && this["IssueInstant"] !== null) {
      node.setAttribute("IssueInstant", this["IssueInstant"]);
    }
    if (typeof this["Destination"] !== "undefined" && this["Destination"] !== null) {
      node.setAttribute("Destination", this["Destination"]);
    }
    if (typeof this["Consent"] !== "undefined" && this["Consent"] !== null) {
      node.setAttribute("Consent", this["Consent"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;
    this["Version"] = node.hasAttribute("Version") ? node.getAttribute("Version") : null;
    this["IssueInstant"] = node.hasAttribute("IssueInstant") ? node.getAttribute("IssueInstant") : null;
    this["Destination"] = node.hasAttribute("Destination") ? node.getAttribute("Destination") : null;
    this["Consent"] = node.hasAttribute("Consent") ? node.getAttribute("Consent") : null;

    return this;
  };

  return x;
}());

// generated from ExtensionsType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ExtensionsType"] = (function() {
  var base = BaseComplexElement;

  var x = function ExtensionsType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ExtensionsType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from StatusResponseType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"] = (function() {
  var base = BaseComplexElement;

  var x = function StatusResponseType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["ID"] = attributes["ID"];
    this["InResponseTo"] = attributes["InResponseTo"];
    this["Version"] = attributes["Version"];
    this["IssueInstant"] = attributes["IssueInstant"];
    this["Destination"] = attributes["Destination"];
    this["Consent"] = attributes["Consent"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusResponseType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }
    if (typeof this["InResponseTo"] !== "undefined" && this["InResponseTo"] !== null) {
      node.setAttribute("InResponseTo", this["InResponseTo"]);
    }
    if (typeof this["Version"] !== "undefined" && this["Version"] !== null) {
      node.setAttribute("Version", this["Version"]);
    }
    if (typeof this["IssueInstant"] !== "undefined" && this["IssueInstant"] !== null) {
      node.setAttribute("IssueInstant", this["IssueInstant"]);
    }
    if (typeof this["Destination"] !== "undefined" && this["Destination"] !== null) {
      node.setAttribute("Destination", this["Destination"]);
    }
    if (typeof this["Consent"] !== "undefined" && this["Consent"] !== null) {
      node.setAttribute("Consent", this["Consent"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;
    this["InResponseTo"] = node.hasAttribute("InResponseTo") ? node.getAttribute("InResponseTo") : null;
    this["Version"] = node.hasAttribute("Version") ? node.getAttribute("Version") : null;
    this["IssueInstant"] = node.hasAttribute("IssueInstant") ? node.getAttribute("IssueInstant") : null;
    this["Destination"] = node.hasAttribute("Destination") ? node.getAttribute("Destination") : null;
    this["Consent"] = node.hasAttribute("Consent") ? node.getAttribute("Consent") : null;

    return this;
  };

  return x;
}());

// generated from StatusType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusType"] = (function() {
  var base = BaseComplexElement;

  var x = function StatusType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from StatusCodeType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusCodeType"] = (function() {
  var base = BaseComplexElement;

  var x = function StatusCodeType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Value"] = attributes["Value"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusCodeType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Value"] !== "undefined" && this["Value"] !== null) {
      node.setAttribute("Value", this["Value"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Value"] = node.hasAttribute("Value") ? node.getAttribute("Value") : null;

    return this;
  };

  return x;
}());

// generated from StatusDetailType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusDetailType"] = (function() {
  var base = BaseComplexElement;

  var x = function StatusDetailType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusDetailType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AssertionIDRequestType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AssertionIDRequestType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function AssertionIDRequestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionIDRequestType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from SubjectQueryAbstractType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQueryAbstractType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function SubjectQueryAbstractType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectQueryAbstractType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AuthnQueryType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnQueryType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQueryAbstractType"];

  var x = function AuthnQueryType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnQueryType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["SessionIndex"] !== "undefined" && this["SessionIndex"] !== null) {
      node.setAttribute("SessionIndex", this["SessionIndex"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["SessionIndex"] = node.hasAttribute("SessionIndex") ? node.getAttribute("SessionIndex") : null;

    return this;
  };

  return x;
}());

// generated from RequestedAuthnContextType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestedAuthnContextType"] = (function() {
  var base = BaseComplexElement;

  var x = function RequestedAuthnContextType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Comparison"] = attributes["Comparison"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequestedAuthnContextType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Comparison"] !== "undefined" && this["Comparison"] !== null) {
      node.setAttribute("Comparison", this["Comparison"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Comparison"] = node.hasAttribute("Comparison") ? node.getAttribute("Comparison") : null;

    return this;
  };

  return x;
}());

// generated from AuthnContextComparisonType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnContextComparisonType"] = (function() {
  var base = BaseSimpleElement;

  var x = function AuthnContextComparisonType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContextComparisonType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AttributeQueryType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AttributeQueryType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQueryAbstractType"];

  var x = function AttributeQueryType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeQueryType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AuthzDecisionQueryType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthzDecisionQueryType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQueryAbstractType"];

  var x = function AuthzDecisionQueryType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthzDecisionQueryType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Resource"] !== "undefined" && this["Resource"] !== null) {
      node.setAttribute("Resource", this["Resource"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Resource"] = node.hasAttribute("Resource") ? node.getAttribute("Resource") : null;

    return this;
  };

  return x;
}());

// generated from AuthnRequestType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnRequestType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function AuthnRequestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnRequestType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ForceAuthn"] !== "undefined" && this["ForceAuthn"] !== null) {
      node.setAttribute("ForceAuthn", this["ForceAuthn"]);
    }
    if (typeof this["IsPassive"] !== "undefined" && this["IsPassive"] !== null) {
      node.setAttribute("IsPassive", this["IsPassive"]);
    }
    if (typeof this["ProtocolBinding"] !== "undefined" && this["ProtocolBinding"] !== null) {
      node.setAttribute("ProtocolBinding", this["ProtocolBinding"]);
    }
    if (typeof this["AssertionConsumerServiceIndex"] !== "undefined" && this["AssertionConsumerServiceIndex"] !== null) {
      node.setAttribute("AssertionConsumerServiceIndex", this["AssertionConsumerServiceIndex"]);
    }
    if (typeof this["AssertionConsumerServiceURL"] !== "undefined" && this["AssertionConsumerServiceURL"] !== null) {
      node.setAttribute("AssertionConsumerServiceURL", this["AssertionConsumerServiceURL"]);
    }
    if (typeof this["AttributeConsumingServiceIndex"] !== "undefined" && this["AttributeConsumingServiceIndex"] !== null) {
      node.setAttribute("AttributeConsumingServiceIndex", this["AttributeConsumingServiceIndex"]);
    }
    if (typeof this["ProviderName"] !== "undefined" && this["ProviderName"] !== null) {
      node.setAttribute("ProviderName", this["ProviderName"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ForceAuthn"] = node.hasAttribute("ForceAuthn") ? node.getAttribute("ForceAuthn") : null;
    this["IsPassive"] = node.hasAttribute("IsPassive") ? node.getAttribute("IsPassive") : null;
    this["ProtocolBinding"] = node.hasAttribute("ProtocolBinding") ? node.getAttribute("ProtocolBinding") : null;
    this["AssertionConsumerServiceIndex"] = node.hasAttribute("AssertionConsumerServiceIndex") ? node.getAttribute("AssertionConsumerServiceIndex") : null;
    this["AssertionConsumerServiceURL"] = node.hasAttribute("AssertionConsumerServiceURL") ? node.getAttribute("AssertionConsumerServiceURL") : null;
    this["AttributeConsumingServiceIndex"] = node.hasAttribute("AttributeConsumingServiceIndex") ? node.getAttribute("AttributeConsumingServiceIndex") : null;
    this["ProviderName"] = node.hasAttribute("ProviderName") ? node.getAttribute("ProviderName") : null;

    return this;
  };

  return x;
}());

// generated from NameIDPolicyType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDPolicyType"] = (function() {
  var base = BaseComplexElement;

  var x = function NameIDPolicyType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Format"] = attributes["Format"];
    this["SPNameQualifier"] = attributes["SPNameQualifier"];
    this["AllowCreate"] = attributes["AllowCreate"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDPolicyType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Format"] !== "undefined" && this["Format"] !== null) {
      node.setAttribute("Format", this["Format"]);
    }
    if (typeof this["SPNameQualifier"] !== "undefined" && this["SPNameQualifier"] !== null) {
      node.setAttribute("SPNameQualifier", this["SPNameQualifier"]);
    }
    if (typeof this["AllowCreate"] !== "undefined" && this["AllowCreate"] !== null) {
      node.setAttribute("AllowCreate", this["AllowCreate"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Format"] = node.hasAttribute("Format") ? node.getAttribute("Format") : null;
    this["SPNameQualifier"] = node.hasAttribute("SPNameQualifier") ? node.getAttribute("SPNameQualifier") : null;
    this["AllowCreate"] = node.hasAttribute("AllowCreate") ? node.getAttribute("AllowCreate") : null;

    return this;
  };

  return x;
}());

// generated from ScopingType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ScopingType"] = (function() {
  var base = BaseComplexElement;

  var x = function ScopingType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["ProxyCount"] = attributes["ProxyCount"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ScopingType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ProxyCount"] !== "undefined" && this["ProxyCount"] !== null) {
      node.setAttribute("ProxyCount", this["ProxyCount"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ProxyCount"] = node.hasAttribute("ProxyCount") ? node.getAttribute("ProxyCount") : null;

    return this;
  };

  return x;
}());

// generated from IDPListType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPListType"] = (function() {
  var base = BaseComplexElement;

  var x = function IDPListType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPListType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from IDPEntryType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPEntryType"] = (function() {
  var base = BaseComplexElement;

  var x = function IDPEntryType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["ProviderID"] = attributes["ProviderID"];
    this["Name"] = attributes["Name"];
    this["Loc"] = attributes["Loc"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPEntryType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ProviderID"] !== "undefined" && this["ProviderID"] !== null) {
      node.setAttribute("ProviderID", this["ProviderID"]);
    }
    if (typeof this["Name"] !== "undefined" && this["Name"] !== null) {
      node.setAttribute("Name", this["Name"]);
    }
    if (typeof this["Loc"] !== "undefined" && this["Loc"] !== null) {
      node.setAttribute("Loc", this["Loc"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ProviderID"] = node.hasAttribute("ProviderID") ? node.getAttribute("ProviderID") : null;
    this["Name"] = node.hasAttribute("Name") ? node.getAttribute("Name") : null;
    this["Loc"] = node.hasAttribute("Loc") ? node.getAttribute("Loc") : null;

    return this;
  };

  return x;
}());

// generated from ResponseType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ResponseType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"];

  var x = function ResponseType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ResponseType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ArtifactResolveType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResolveType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function ArtifactResolveType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ArtifactResolveType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ArtifactResponseType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResponseType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"];

  var x = function ArtifactResponseType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ArtifactResponseType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ManageNameIDRequestType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ManageNameIDRequestType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function ManageNameIDRequestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ManageNameIDRequestType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from TerminateType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,TerminateType"] = (function() {
  var base = BaseComplexElement;

  var x = function TerminateType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "TerminateType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from LogoutRequestType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,LogoutRequestType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function LogoutRequestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "LogoutRequestType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Reason"] !== "undefined" && this["Reason"] !== null) {
      node.setAttribute("Reason", this["Reason"]);
    }
    if (typeof this["NotOnOrAfter"] !== "undefined" && this["NotOnOrAfter"] !== null) {
      node.setAttribute("NotOnOrAfter", this["NotOnOrAfter"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Reason"] = node.hasAttribute("Reason") ? node.getAttribute("Reason") : null;
    this["NotOnOrAfter"] = node.hasAttribute("NotOnOrAfter") ? node.getAttribute("NotOnOrAfter") : null;

    return this;
  };

  return x;
}());

// generated from NameIDMappingRequestType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingRequestType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestAbstractType"];

  var x = function NameIDMappingRequestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDMappingRequestType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NameIDMappingResponseType of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingResponseType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"];

  var x = function NameIDMappingResponseType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDMappingResponseType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from BaseIDAbstractType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,BaseIDAbstractType"] = (function() {
  var base = BaseComplexElement;

  var x = function BaseIDAbstractType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "BaseIDAbstractType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from NameIDType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,NameIDType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function NameIDType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Format"] !== "undefined" && this["Format"] !== null) {
      node.setAttribute("Format", this["Format"]);
    }
    if (typeof this["SPProvidedID"] !== "undefined" && this["SPProvidedID"] !== null) {
      node.setAttribute("SPProvidedID", this["SPProvidedID"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Format"] = node.hasAttribute("Format") ? node.getAttribute("Format") : null;
    this["SPProvidedID"] = node.hasAttribute("SPProvidedID") ? node.getAttribute("SPProvidedID") : null;

    return this;
  };

  return x;
}());

// generated from EncryptedElementType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedElementType"] = (function() {
  var base = BaseComplexElement;

  var x = function EncryptedElementType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedElementType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AssertionType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AssertionType"] = (function() {
  var base = BaseComplexElement;

  var x = function AssertionType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Version"] = attributes["Version"];
    this["ID"] = attributes["ID"];
    this["IssueInstant"] = attributes["IssueInstant"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Version"] !== "undefined" && this["Version"] !== null) {
      node.setAttribute("Version", this["Version"]);
    }
    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }
    if (typeof this["IssueInstant"] !== "undefined" && this["IssueInstant"] !== null) {
      node.setAttribute("IssueInstant", this["IssueInstant"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Version"] = node.hasAttribute("Version") ? node.getAttribute("Version") : null;
    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;
    this["IssueInstant"] = node.hasAttribute("IssueInstant") ? node.getAttribute("IssueInstant") : null;

    return this;
  };

  return x;
}());

// generated from SubjectType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectType"] = (function() {
  var base = BaseComplexElement;

  var x = function SubjectType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from SubjectConfirmationType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmationType"] = (function() {
  var base = BaseComplexElement;

  var x = function SubjectConfirmationType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Method"] = attributes["Method"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectConfirmationType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Method"] !== "undefined" && this["Method"] !== null) {
      node.setAttribute("Method", this["Method"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Method"] = node.hasAttribute("Method") ? node.getAttribute("Method") : null;

    return this;
  };

  return x;
}());

// generated from SubjectConfirmationDataType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmationDataType"] = (function() {
  var base = BaseComplexElement;

  var x = function SubjectConfirmationDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectConfirmationDataType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["NotBefore"] !== "undefined" && this["NotBefore"] !== null) {
      node.setAttribute("NotBefore", this["NotBefore"]);
    }
    if (typeof this["NotOnOrAfter"] !== "undefined" && this["NotOnOrAfter"] !== null) {
      node.setAttribute("NotOnOrAfter", this["NotOnOrAfter"]);
    }
    if (typeof this["Recipient"] !== "undefined" && this["Recipient"] !== null) {
      node.setAttribute("Recipient", this["Recipient"]);
    }
    if (typeof this["InResponseTo"] !== "undefined" && this["InResponseTo"] !== null) {
      node.setAttribute("InResponseTo", this["InResponseTo"]);
    }
    if (typeof this["Address"] !== "undefined" && this["Address"] !== null) {
      node.setAttribute("Address", this["Address"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["NotBefore"] = node.hasAttribute("NotBefore") ? node.getAttribute("NotBefore") : null;
    this["NotOnOrAfter"] = node.hasAttribute("NotOnOrAfter") ? node.getAttribute("NotOnOrAfter") : null;
    this["Recipient"] = node.hasAttribute("Recipient") ? node.getAttribute("Recipient") : null;
    this["InResponseTo"] = node.hasAttribute("InResponseTo") ? node.getAttribute("InResponseTo") : null;
    this["Address"] = node.hasAttribute("Address") ? node.getAttribute("Address") : null;

    return this;
  };

  return x;
}());

// generated from KeyInfoConfirmationDataType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,KeyInfoConfirmationDataType"] = (function() {
  var base = BaseComplexElement;

  var x = function KeyInfoConfirmationDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyInfoConfirmationDataType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from ConditionsType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionsType"] = (function() {
  var base = BaseComplexElement;

  var x = function ConditionsType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["NotBefore"] = attributes["NotBefore"];
    this["NotOnOrAfter"] = attributes["NotOnOrAfter"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ConditionsType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["NotBefore"] !== "undefined" && this["NotBefore"] !== null) {
      node.setAttribute("NotBefore", this["NotBefore"]);
    }
    if (typeof this["NotOnOrAfter"] !== "undefined" && this["NotOnOrAfter"] !== null) {
      node.setAttribute("NotOnOrAfter", this["NotOnOrAfter"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["NotBefore"] = node.hasAttribute("NotBefore") ? node.getAttribute("NotBefore") : null;
    this["NotOnOrAfter"] = node.hasAttribute("NotOnOrAfter") ? node.getAttribute("NotOnOrAfter") : null;

    return this;
  };

  return x;
}());

// generated from ConditionAbstractType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionAbstractType"] = (function() {
  var base = BaseComplexElement;

  var x = function ConditionAbstractType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ConditionAbstractType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AudienceRestrictionType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AudienceRestrictionType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionAbstractType"];

  var x = function AudienceRestrictionType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AudienceRestrictionType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from OneTimeUseType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,OneTimeUseType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionAbstractType"];

  var x = function OneTimeUseType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OneTimeUseType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from ProxyRestrictionType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,ProxyRestrictionType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionAbstractType"];

  var x = function ProxyRestrictionType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ProxyRestrictionType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Count"] !== "undefined" && this["Count"] !== null) {
      node.setAttribute("Count", this["Count"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Count"] = node.hasAttribute("Count") ? node.getAttribute("Count") : null;

    return this;
  };

  return x;
}());

// generated from AdviceType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AdviceType"] = (function() {
  var base = BaseComplexElement;

  var x = function AdviceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AdviceType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from StatementAbstractType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,StatementAbstractType"] = (function() {
  var base = BaseComplexElement;

  var x = function StatementAbstractType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatementAbstractType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnStatementType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnStatementType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,StatementAbstractType"];

  var x = function AuthnStatementType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnStatementType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["AuthnInstant"] !== "undefined" && this["AuthnInstant"] !== null) {
      node.setAttribute("AuthnInstant", this["AuthnInstant"]);
    }
    if (typeof this["SessionIndex"] !== "undefined" && this["SessionIndex"] !== null) {
      node.setAttribute("SessionIndex", this["SessionIndex"]);
    }
    if (typeof this["SessionNotOnOrAfter"] !== "undefined" && this["SessionNotOnOrAfter"] !== null) {
      node.setAttribute("SessionNotOnOrAfter", this["SessionNotOnOrAfter"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["AuthnInstant"] = node.hasAttribute("AuthnInstant") ? node.getAttribute("AuthnInstant") : null;
    this["SessionIndex"] = node.hasAttribute("SessionIndex") ? node.getAttribute("SessionIndex") : null;
    this["SessionNotOnOrAfter"] = node.hasAttribute("SessionNotOnOrAfter") ? node.getAttribute("SessionNotOnOrAfter") : null;

    return this;
  };

  return x;
}());

// generated from SubjectLocalityType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectLocalityType"] = (function() {
  var base = BaseComplexElement;

  var x = function SubjectLocalityType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Address"] = attributes["Address"];
    this["DNSName"] = attributes["DNSName"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectLocalityType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Address"] !== "undefined" && this["Address"] !== null) {
      node.setAttribute("Address", this["Address"]);
    }
    if (typeof this["DNSName"] !== "undefined" && this["DNSName"] !== null) {
      node.setAttribute("DNSName", this["DNSName"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Address"] = node.hasAttribute("Address") ? node.getAttribute("Address") : null;
    this["DNSName"] = node.hasAttribute("DNSName") ? node.getAttribute("DNSName") : null;

    return this;
  };

  return x;
}());

// generated from AuthnContextType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContextType"] = (function() {
  var base = BaseComplexElement;

  var x = function AuthnContextType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContextType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthzDecisionStatementType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthzDecisionStatementType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,StatementAbstractType"];

  var x = function AuthzDecisionStatementType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthzDecisionStatementType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Resource"] !== "undefined" && this["Resource"] !== null) {
      node.setAttribute("Resource", this["Resource"]);
    }
    if (typeof this["Decision"] !== "undefined" && this["Decision"] !== null) {
      node.setAttribute("Decision", this["Decision"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Resource"] = node.hasAttribute("Resource") ? node.getAttribute("Resource") : null;
    this["Decision"] = node.hasAttribute("Decision") ? node.getAttribute("Decision") : null;

    return this;
  };

  return x;
}());

// generated from DecisionType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,DecisionType"] = (function() {
  var base = BaseSimpleElement;

  var x = function DecisionType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DecisionType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from ActionType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,ActionType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function ActionType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ActionType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Namespace"] !== "undefined" && this["Namespace"] !== null) {
      node.setAttribute("Namespace", this["Namespace"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Namespace"] = node.hasAttribute("Namespace") ? node.getAttribute("Namespace") : null;

    return this;
  };

  return x;
}());

// generated from EvidenceType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,EvidenceType"] = (function() {
  var base = BaseComplexElement;

  var x = function EvidenceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EvidenceType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AttributeStatementType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeStatementType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,StatementAbstractType"];

  var x = function AttributeStatementType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeStatementType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AttributeType of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeType"] = (function() {
  var base = BaseComplexElement;

  var x = function AttributeType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Name"] = attributes["Name"];
    this["NameFormat"] = attributes["NameFormat"];
    this["FriendlyName"] = attributes["FriendlyName"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Name"] !== "undefined" && this["Name"] !== null) {
      node.setAttribute("Name", this["Name"]);
    }
    if (typeof this["NameFormat"] !== "undefined" && this["NameFormat"] !== null) {
      node.setAttribute("NameFormat", this["NameFormat"]);
    }
    if (typeof this["FriendlyName"] !== "undefined" && this["FriendlyName"] !== null) {
      node.setAttribute("FriendlyName", this["FriendlyName"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Name"] = node.hasAttribute("Name") ? node.getAttribute("Name") : null;
    this["NameFormat"] = node.hasAttribute("NameFormat") ? node.getAttribute("NameFormat") : null;
    this["FriendlyName"] = node.hasAttribute("FriendlyName") ? node.getAttribute("FriendlyName") : null;

    return this;
  };

  return x;
}());

// generated from CryptoBinary of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,CryptoBinary"] = (function() {
  var base = BaseSimpleElement;

  var x = function CryptoBinary(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CryptoBinary";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignatureType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureType"] = (function() {
  var base = BaseComplexElement;

  var x = function SignatureType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from SignatureValueType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureValueType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,base64Binary"];

  var x = function SignatureValueType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureValueType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from SignedInfoType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignedInfoType"] = (function() {
  var base = BaseComplexElement;

  var x = function SignedInfoType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignedInfoType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from CanonicalizationMethodType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,CanonicalizationMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function CanonicalizationMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CanonicalizationMethodType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from SignatureMethodType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function SignatureMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureMethodType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from ReferenceType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,ReferenceType"] = (function() {
  var base = BaseComplexElement;

  var x = function ReferenceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
    this["URI"] = attributes["URI"];
    this["Type"] = attributes["Type"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ReferenceType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }
    if (typeof this["URI"] !== "undefined" && this["URI"] !== null) {
      node.setAttribute("URI", this["URI"]);
    }
    if (typeof this["Type"] !== "undefined" && this["Type"] !== null) {
      node.setAttribute("Type", this["Type"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;
    this["URI"] = node.hasAttribute("URI") ? node.getAttribute("URI") : null;
    this["Type"] = node.hasAttribute("Type") ? node.getAttribute("Type") : null;

    return this;
  };

  return x;
}());

// generated from TransformsType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,TransformsType"] = (function() {
  var base = BaseComplexElement;

  var x = function TransformsType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "TransformsType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from TransformType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,TransformType"] = (function() {
  var base = BaseComplexElement;

  var x = function TransformType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "TransformType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from DigestMethodType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DigestMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function DigestMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DigestMethodType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from DigestValueType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DigestValueType"] = (function() {
  var base = BaseSimpleElement;

  var x = function DigestValueType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DigestValueType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from KeyInfoType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,KeyInfoType"] = (function() {
  var base = BaseComplexElement;

  var x = function KeyInfoType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyInfoType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from KeyValueType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,KeyValueType"] = (function() {
  var base = BaseComplexElement;

  var x = function KeyValueType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyValueType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from RetrievalMethodType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,RetrievalMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function RetrievalMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["URI"] = attributes["URI"];
    this["Type"] = attributes["Type"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RetrievalMethodType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["URI"] !== "undefined" && this["URI"] !== null) {
      node.setAttribute("URI", this["URI"]);
    }
    if (typeof this["Type"] !== "undefined" && this["Type"] !== null) {
      node.setAttribute("Type", this["Type"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["URI"] = node.hasAttribute("URI") ? node.getAttribute("URI") : null;
    this["Type"] = node.hasAttribute("Type") ? node.getAttribute("Type") : null;

    return this;
  };

  return x;
}());

// generated from X509DataType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,X509DataType"] = (function() {
  var base = BaseComplexElement;

  var x = function X509DataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "X509DataType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from X509IssuerSerialType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,X509IssuerSerialType"] = (function() {
  var base = BaseComplexElement;

  var x = function X509IssuerSerialType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "X509IssuerSerialType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from PGPDataType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,PGPDataType"] = (function() {
  var base = BaseComplexElement;

  var x = function PGPDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "PGPDataType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SPKIDataType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SPKIDataType"] = (function() {
  var base = BaseComplexElement;

  var x = function SPKIDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SPKIDataType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from ObjectType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,ObjectType"] = (function() {
  var base = BaseComplexElement;

  var x = function ObjectType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
    this["MimeType"] = attributes["MimeType"];
    this["Encoding"] = attributes["Encoding"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ObjectType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }
    if (typeof this["MimeType"] !== "undefined" && this["MimeType"] !== null) {
      node.setAttribute("MimeType", this["MimeType"]);
    }
    if (typeof this["Encoding"] !== "undefined" && this["Encoding"] !== null) {
      node.setAttribute("Encoding", this["Encoding"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;
    this["MimeType"] = node.hasAttribute("MimeType") ? node.getAttribute("MimeType") : null;
    this["Encoding"] = node.hasAttribute("Encoding") ? node.getAttribute("Encoding") : null;

    return this;
  };

  return x;
}());

// generated from ManifestType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,ManifestType"] = (function() {
  var base = BaseComplexElement;

  var x = function ManifestType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ManifestType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from SignaturePropertiesType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignaturePropertiesType"] = (function() {
  var base = BaseComplexElement;

  var x = function SignaturePropertiesType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignaturePropertiesType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from SignaturePropertyType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignaturePropertyType"] = (function() {
  var base = BaseComplexElement;

  var x = function SignaturePropertyType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Target"] = attributes["Target"];
    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignaturePropertyType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Target"] !== "undefined" && this["Target"] !== null) {
      node.setAttribute("Target", this["Target"]);
    }
    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Target"] = node.hasAttribute("Target") ? node.getAttribute("Target") : null;
    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from HMACOutputLengthType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,HMACOutputLengthType"] = (function() {
  var base = BaseSimpleElement;

  var x = function HMACOutputLengthType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "HMACOutputLengthType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from DSAKeyValueType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DSAKeyValueType"] = (function() {
  var base = BaseComplexElement;

  var x = function DSAKeyValueType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DSAKeyValueType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from RSAKeyValueType of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,RSAKeyValueType"] = (function() {
  var base = BaseComplexElement;

  var x = function RSAKeyValueType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RSAKeyValueType";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from EncryptedType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedType"] = (function() {
  var base = BaseComplexElement;

  var x = function EncryptedType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
    this["Type"] = attributes["Type"];
    this["MimeType"] = attributes["MimeType"];
    this["Encoding"] = attributes["Encoding"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }
    if (typeof this["Type"] !== "undefined" && this["Type"] !== null) {
      node.setAttribute("Type", this["Type"]);
    }
    if (typeof this["MimeType"] !== "undefined" && this["MimeType"] !== null) {
      node.setAttribute("MimeType", this["MimeType"]);
    }
    if (typeof this["Encoding"] !== "undefined" && this["Encoding"] !== null) {
      node.setAttribute("Encoding", this["Encoding"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;
    this["Type"] = node.hasAttribute("Type") ? node.getAttribute("Type") : null;
    this["MimeType"] = node.hasAttribute("MimeType") ? node.getAttribute("MimeType") : null;
    this["Encoding"] = node.hasAttribute("Encoding") ? node.getAttribute("Encoding") : null;

    return this;
  };

  return x;
}());

// generated from EncryptionMethodType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function EncryptionMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionMethodType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from KeySizeType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,KeySizeType"] = (function() {
  var base = BaseSimpleElement;

  var x = function KeySizeType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeySizeType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from CipherDataType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,CipherDataType"] = (function() {
  var base = BaseComplexElement;

  var x = function CipherDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CipherDataType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from CipherReferenceType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,CipherReferenceType"] = (function() {
  var base = BaseComplexElement;

  var x = function CipherReferenceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["URI"] = attributes["URI"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CipherReferenceType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["URI"] !== "undefined" && this["URI"] !== null) {
      node.setAttribute("URI", this["URI"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["URI"] = node.hasAttribute("URI") ? node.getAttribute("URI") : null;

    return this;
  };

  return x;
}());

// generated from TransformsType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,TransformsType"] = (function() {
  var base = BaseComplexElement;

  var x = function TransformsType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "TransformsType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptedDataType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedDataType"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedType"];

  var x = function EncryptedDataType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedDataType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptedKeyType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedKeyType"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedType"];

  var x = function EncryptedKeyType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedKeyType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Recipient"] !== "undefined" && this["Recipient"] !== null) {
      node.setAttribute("Recipient", this["Recipient"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Recipient"] = node.hasAttribute("Recipient") ? node.getAttribute("Recipient") : null;

    return this;
  };

  return x;
}());

// generated from AgreementMethodType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,AgreementMethodType"] = (function() {
  var base = BaseComplexElement;

  var x = function AgreementMethodType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Algorithm"] = attributes["Algorithm"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AgreementMethodType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Algorithm"] !== "undefined" && this["Algorithm"] !== null) {
      node.setAttribute("Algorithm", this["Algorithm"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Algorithm"] = node.hasAttribute("Algorithm") ? node.getAttribute("Algorithm") : null;

    return this;
  };

  return x;
}());

// generated from ReferenceType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,ReferenceType"] = (function() {
  var base = BaseComplexElement;

  var x = function ReferenceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["URI"] = attributes["URI"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ReferenceType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["URI"] !== "undefined" && this["URI"] !== null) {
      node.setAttribute("URI", this["URI"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["URI"] = node.hasAttribute("URI") ? node.getAttribute("URI") : null;

    return this;
  };

  return x;
}());

// generated from EncryptionPropertiesType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionPropertiesType"] = (function() {
  var base = BaseComplexElement;

  var x = function EncryptionPropertiesType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionPropertiesType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from EncryptionPropertyType of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionPropertyType"] = (function() {
  var base = BaseComplexElement;

  var x = function EncryptionPropertyType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Target"] = attributes["Target"];
    this["Id"] = attributes["Id"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionPropertyType";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Target"] !== "undefined" && this["Target"] !== null) {
      node.setAttribute("Target", this["Target"]);
    }
    if (typeof this["Id"] !== "undefined" && this["Id"] !== null) {
      node.setAttribute("Id", this["Id"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Target"] = node.hasAttribute("Target") ? node.getAttribute("Target") : null;
    this["Id"] = node.hasAttribute("Id") ? node.getAttribute("Id") : null;

    return this;
  };

  return x;
}());

// generated from entityIDType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,entityIDType"] = (function() {
  var base = BaseSimpleElement;

  var x = function entityIDType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "entityIDType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from localizedNameType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedNameType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function localizedNameType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "localizedNameType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["lang"] !== "undefined" && this["lang"] !== null) {
      node.setAttribute("lang", this["lang"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["lang"] = node.hasAttribute("lang") ? node.getAttribute("lang") : null;

    return this;
  };

  return x;
}());

// generated from localizedURIType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedURIType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function localizedURIType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "localizedURIType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["lang"] !== "undefined" && this["lang"] !== null) {
      node.setAttribute("lang", this["lang"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["lang"] = node.hasAttribute("lang") ? node.getAttribute("lang") : null;

    return this;
  };

  return x;
}());

// generated from ExtensionsType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ExtensionsType"] = (function() {
  var base = BaseComplexElement;

  var x = function ExtensionsType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ExtensionsType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from EndpointType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"] = (function() {
  var base = BaseComplexElement;

  var x = function EndpointType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["Binding"] = attributes["Binding"];
    this["Location"] = attributes["Location"];
    this["ResponseLocation"] = attributes["ResponseLocation"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EndpointType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["Binding"] !== "undefined" && this["Binding"] !== null) {
      node.setAttribute("Binding", this["Binding"]);
    }
    if (typeof this["Location"] !== "undefined" && this["Location"] !== null) {
      node.setAttribute("Location", this["Location"]);
    }
    if (typeof this["ResponseLocation"] !== "undefined" && this["ResponseLocation"] !== null) {
      node.setAttribute("ResponseLocation", this["ResponseLocation"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["Binding"] = node.hasAttribute("Binding") ? node.getAttribute("Binding") : null;
    this["Location"] = node.hasAttribute("Location") ? node.getAttribute("Location") : null;
    this["ResponseLocation"] = node.hasAttribute("ResponseLocation") ? node.getAttribute("ResponseLocation") : null;

    return this;
  };

  return x;
}());

// generated from IndexedEndpointType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,IndexedEndpointType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function IndexedEndpointType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IndexedEndpointType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["index"] !== "undefined" && this["index"] !== null) {
      node.setAttribute("index", this["index"]);
    }
    if (typeof this["isDefault"] !== "undefined" && this["isDefault"] !== null) {
      node.setAttribute("isDefault", this["isDefault"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["index"] = node.hasAttribute("index") ? node.getAttribute("index") : null;
    this["isDefault"] = node.hasAttribute("isDefault") ? node.getAttribute("isDefault") : null;

    return this;
  };

  return x;
}());

// generated from EntitiesDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntitiesDescriptorType"] = (function() {
  var base = BaseComplexElement;

  var x = function EntitiesDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["validUntil"] = attributes["validUntil"];
    this["cacheDuration"] = attributes["cacheDuration"];
    this["ID"] = attributes["ID"];
    this["Name"] = attributes["Name"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EntitiesDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["validUntil"] !== "undefined" && this["validUntil"] !== null) {
      node.setAttribute("validUntil", this["validUntil"]);
    }
    if (typeof this["cacheDuration"] !== "undefined" && this["cacheDuration"] !== null) {
      node.setAttribute("cacheDuration", this["cacheDuration"]);
    }
    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }
    if (typeof this["Name"] !== "undefined" && this["Name"] !== null) {
      node.setAttribute("Name", this["Name"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["validUntil"] = node.hasAttribute("validUntil") ? node.getAttribute("validUntil") : null;
    this["cacheDuration"] = node.hasAttribute("cacheDuration") ? node.getAttribute("cacheDuration") : null;
    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;
    this["Name"] = node.hasAttribute("Name") ? node.getAttribute("Name") : null;

    return this;
  };

  return x;
}());

// generated from EntityDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntityDescriptorType"] = (function() {
  var base = BaseComplexElement;

  var x = function EntityDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["entityID"] = attributes["entityID"];
    this["validUntil"] = attributes["validUntil"];
    this["cacheDuration"] = attributes["cacheDuration"];
    this["ID"] = attributes["ID"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EntityDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["entityID"] !== "undefined" && this["entityID"] !== null) {
      node.setAttribute("entityID", this["entityID"]);
    }
    if (typeof this["validUntil"] !== "undefined" && this["validUntil"] !== null) {
      node.setAttribute("validUntil", this["validUntil"]);
    }
    if (typeof this["cacheDuration"] !== "undefined" && this["cacheDuration"] !== null) {
      node.setAttribute("cacheDuration", this["cacheDuration"]);
    }
    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["entityID"] = node.hasAttribute("entityID") ? node.getAttribute("entityID") : null;
    this["validUntil"] = node.hasAttribute("validUntil") ? node.getAttribute("validUntil") : null;
    this["cacheDuration"] = node.hasAttribute("cacheDuration") ? node.getAttribute("cacheDuration") : null;
    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;

    return this;
  };

  return x;
}());

// generated from OrganizationType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,OrganizationType"] = (function() {
  var base = BaseComplexElement;

  var x = function OrganizationType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OrganizationType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ContactType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ContactType"] = (function() {
  var base = BaseComplexElement;

  var x = function ContactType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["contactType"] = attributes["contactType"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ContactType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["contactType"] !== "undefined" && this["contactType"] !== null) {
      node.setAttribute("contactType", this["contactType"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["contactType"] = node.hasAttribute("contactType") ? node.getAttribute("contactType") : null;

    return this;
  };

  return x;
}());

// generated from ContactTypeType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ContactTypeType"] = (function() {
  var base = BaseSimpleElement;

  var x = function ContactTypeType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ContactTypeType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AdditionalMetadataLocationType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AdditionalMetadataLocationType"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AdditionalMetadataLocationType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AdditionalMetadataLocationType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["namespace"] !== "undefined" && this["namespace"] !== null) {
      node.setAttribute("namespace", this["namespace"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["namespace"] = node.hasAttribute("namespace") ? node.getAttribute("namespace") : null;

    return this;
  };

  return x;
}());

// generated from RoleDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"] = (function() {
  var base = BaseComplexElement;

  var x = function RoleDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["ID"] = attributes["ID"];
    this["validUntil"] = attributes["validUntil"];
    this["cacheDuration"] = attributes["cacheDuration"];
    this["protocolSupportEnumeration"] = attributes["protocolSupportEnumeration"];
    this["errorURL"] = attributes["errorURL"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RoleDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }
    if (typeof this["validUntil"] !== "undefined" && this["validUntil"] !== null) {
      node.setAttribute("validUntil", this["validUntil"]);
    }
    if (typeof this["cacheDuration"] !== "undefined" && this["cacheDuration"] !== null) {
      node.setAttribute("cacheDuration", this["cacheDuration"]);
    }
    if (typeof this["protocolSupportEnumeration"] !== "undefined" && this["protocolSupportEnumeration"] !== null) {
      node.setAttribute("protocolSupportEnumeration", this["protocolSupportEnumeration"]);
    }
    if (typeof this["errorURL"] !== "undefined" && this["errorURL"] !== null) {
      node.setAttribute("errorURL", this["errorURL"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;
    this["validUntil"] = node.hasAttribute("validUntil") ? node.getAttribute("validUntil") : null;
    this["cacheDuration"] = node.hasAttribute("cacheDuration") ? node.getAttribute("cacheDuration") : null;
    this["protocolSupportEnumeration"] = node.hasAttribute("protocolSupportEnumeration") ? node.getAttribute("protocolSupportEnumeration") : null;
    this["errorURL"] = node.hasAttribute("errorURL") ? node.getAttribute("errorURL") : null;

    return this;
  };

  return x;
}());

// generated from anyURIListType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,anyURIListType"] = (function() {
  var base = BaseSimpleElement;

  var x = function anyURIListType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "anyURIListType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from KeyDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,KeyDescriptorType"] = (function() {
  var base = BaseComplexElement;

  var x = function KeyDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["use"] = attributes["use"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["use"] !== "undefined" && this["use"] !== null) {
      node.setAttribute("use", this["use"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["use"] = node.hasAttribute("use") ? node.getAttribute("use") : null;

    return this;
  };

  return x;
}());

// generated from KeyTypes of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,KeyTypes"] = (function() {
  var base = BaseSimpleElement;

  var x = function KeyTypes(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyTypes";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from SSODescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SSODescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"];

  var x = function SSODescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SSODescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from IDPSSODescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,IDPSSODescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,SSODescriptorType"];

  var x = function IDPSSODescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPSSODescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["WantAuthnRequestsSigned"] !== "undefined" && this["WantAuthnRequestsSigned"] !== null) {
      node.setAttribute("WantAuthnRequestsSigned", this["WantAuthnRequestsSigned"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["WantAuthnRequestsSigned"] = node.hasAttribute("WantAuthnRequestsSigned") ? node.getAttribute("WantAuthnRequestsSigned") : null;

    return this;
  };

  return x;
}());

// generated from SPSSODescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SPSSODescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,SSODescriptorType"];

  var x = function SPSSODescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SPSSODescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["AuthnRequestsSigned"] !== "undefined" && this["AuthnRequestsSigned"] !== null) {
      node.setAttribute("AuthnRequestsSigned", this["AuthnRequestsSigned"]);
    }
    if (typeof this["WantAssertionsSigned"] !== "undefined" && this["WantAssertionsSigned"] !== null) {
      node.setAttribute("WantAssertionsSigned", this["WantAssertionsSigned"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["AuthnRequestsSigned"] = node.hasAttribute("AuthnRequestsSigned") ? node.getAttribute("AuthnRequestsSigned") : null;
    this["WantAssertionsSigned"] = node.hasAttribute("WantAssertionsSigned") ? node.getAttribute("WantAssertionsSigned") : null;

    return this;
  };

  return x;
}());

// generated from AttributeConsumingServiceType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeConsumingServiceType"] = (function() {
  var base = BaseComplexElement;

  var x = function AttributeConsumingServiceType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["index"] = attributes["index"];
    this["isDefault"] = attributes["isDefault"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeConsumingServiceType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["index"] !== "undefined" && this["index"] !== null) {
      node.setAttribute("index", this["index"]);
    }
    if (typeof this["isDefault"] !== "undefined" && this["isDefault"] !== null) {
      node.setAttribute("isDefault", this["isDefault"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["index"] = node.hasAttribute("index") ? node.getAttribute("index") : null;
    this["isDefault"] = node.hasAttribute("isDefault") ? node.getAttribute("isDefault") : null;

    return this;
  };

  return x;
}());

// generated from RequestedAttributeType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,RequestedAttributeType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeType"];

  var x = function RequestedAttributeType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequestedAttributeType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["isRequired"] !== "undefined" && this["isRequired"] !== null) {
      node.setAttribute("isRequired", this["isRequired"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["isRequired"] = node.hasAttribute("isRequired") ? node.getAttribute("isRequired") : null;

    return this;
  };

  return x;
}());

// generated from AuthnAuthorityDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AuthnAuthorityDescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"];

  var x = function AuthnAuthorityDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnAuthorityDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from PDPDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,PDPDescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"];

  var x = function PDPDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "PDPDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AttributeAuthorityDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeAuthorityDescriptorType"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"];

  var x = function AttributeAuthorityDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeAuthorityDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AffiliationDescriptorType of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AffiliationDescriptorType"] = (function() {
  var base = BaseComplexElement;

  var x = function AffiliationDescriptorType(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);

    this["affiliationOwnerID"] = attributes["affiliationOwnerID"];
    this["validUntil"] = attributes["validUntil"];
    this["cacheDuration"] = attributes["cacheDuration"];
    this["ID"] = attributes["ID"];
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AffiliationDescriptorType";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  x.prototype.toXML = function toXML() {
    var node = base.prototype.toXML.call(this);

    if (typeof this["affiliationOwnerID"] !== "undefined" && this["affiliationOwnerID"] !== null) {
      node.setAttribute("affiliationOwnerID", this["affiliationOwnerID"]);
    }
    if (typeof this["validUntil"] !== "undefined" && this["validUntil"] !== null) {
      node.setAttribute("validUntil", this["validUntil"]);
    }
    if (typeof this["cacheDuration"] !== "undefined" && this["cacheDuration"] !== null) {
      node.setAttribute("cacheDuration", this["cacheDuration"]);
    }
    if (typeof this["ID"] !== "undefined" && this["ID"] !== null) {
      node.setAttribute("ID", this["ID"]);
    }

    return node;
  };

  x.prototype.fromXML = function fromXML(node) {
    base.prototype.fromXML.call(this, node);

    this["affiliationOwnerID"] = node.hasAttribute("affiliationOwnerID") ? node.getAttribute("affiliationOwnerID") : null;
    this["validUntil"] = node.hasAttribute("validUntil") ? node.getAttribute("validUntil") : null;
    this["cacheDuration"] = node.hasAttribute("cacheDuration") ? node.getAttribute("cacheDuration") : null;
    this["ID"] = node.hasAttribute("ID") ? node.getAttribute("ID") : null;

    return this;
  };

  return x;
}());

// generated from Extensions of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Extensions"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ExtensionsType"];

  var x = function Extensions(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Extensions";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from Status of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Status"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusType"];

  var x = function Status(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Status";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from StatusCode of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusCode"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusCodeType"];

  var x = function StatusCode(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusCode";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from StatusMessage of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusMessage"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function StatusMessage(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusMessage";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from StatusDetail of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusDetail"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusDetailType"];

  var x = function StatusDetail(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "StatusDetail";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AssertionIDRequest of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AssertionIDRequest"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,AssertionIDRequestType"];

  var x = function AssertionIDRequest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionIDRequest";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from SubjectQuery of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQuery"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,SubjectQueryAbstractType"];

  var x = function SubjectQuery(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectQuery";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AuthnQuery of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnQuery"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnQueryType"];

  var x = function AuthnQuery(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnQuery";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from RequestedAuthnContext of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestedAuthnContext"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequestedAuthnContextType"];

  var x = function RequestedAuthnContext(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequestedAuthnContext";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AttributeQuery of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AttributeQuery"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,AttributeQueryType"];

  var x = function AttributeQuery(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeQuery";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AuthzDecisionQuery of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthzDecisionQuery"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthzDecisionQueryType"];

  var x = function AuthzDecisionQuery(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthzDecisionQuery";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from AuthnRequest of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnRequest"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,AuthnRequestType"];

  var x = function AuthnRequest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnRequest";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NameIDPolicy of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDPolicy"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDPolicyType"];

  var x = function NameIDPolicy(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDPolicy";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from Scoping of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Scoping"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ScopingType"];

  var x = function Scoping(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Scoping";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from RequesterID of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,RequesterID"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function RequesterID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequesterID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from IDPList of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPList"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPListType"];

  var x = function IDPList(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPList";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from IDPEntry of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPEntry"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,IDPEntryType"];

  var x = function IDPEntry(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPEntry";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from GetComplete of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,GetComplete"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function GetComplete(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "GetComplete";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from Response of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Response"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ResponseType"];

  var x = function Response(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Response";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ArtifactResolve of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResolve"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResolveType"];

  var x = function ArtifactResolve(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ArtifactResolve";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from Artifact of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Artifact"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function Artifact(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Artifact";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ArtifactResponse of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResponse"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ArtifactResponseType"];

  var x = function ArtifactResponse(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ArtifactResponse";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ManageNameIDRequest of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ManageNameIDRequest"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,ManageNameIDRequestType"];

  var x = function ManageNameIDRequest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ManageNameIDRequest";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NewID of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NewID"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function NewID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NewID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NewEncryptedID of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NewEncryptedID"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedElementType"];

  var x = function NewEncryptedID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NewEncryptedID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from Terminate of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,Terminate"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,TerminateType"];

  var x = function Terminate(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Terminate";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from ManageNameIDResponse of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,ManageNameIDResponse"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"];

  var x = function ManageNameIDResponse(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ManageNameIDResponse";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from LogoutRequest of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,LogoutRequest"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,LogoutRequestType"];

  var x = function LogoutRequest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "LogoutRequest";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from SessionIndex of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,SessionIndex"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function SessionIndex(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SessionIndex";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from LogoutResponse of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,LogoutResponse"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,StatusResponseType"];

  var x = function LogoutResponse(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "LogoutResponse";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NameIDMappingRequest of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingRequest"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingRequestType"];

  var x = function NameIDMappingRequest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDMappingRequest";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from NameIDMappingResponse of urn:oasis:names:tc:SAML:2.0:protocol
definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingResponse"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:protocol,NameIDMappingResponseType"];

  var x = function NameIDMappingResponse(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDMappingResponse";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:protocol";

  return x;
}());

// generated from BaseID of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,BaseID"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,BaseIDAbstractType"];

  var x = function BaseID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "BaseID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from NameID of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,NameID"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,NameIDType"];

  var x = function NameID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from EncryptedID of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedID"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedElementType"];

  var x = function EncryptedID(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedID";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Issuer of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Issuer"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,NameIDType"];

  var x = function Issuer(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Issuer";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AssertionIDRef of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AssertionIDRef"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,NCName"];

  var x = function AssertionIDRef(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionIDRef";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AssertionURIRef of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AssertionURIRef"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AssertionURIRef(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionURIRef";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Assertion of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Assertion"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AssertionType"];

  var x = function Assertion(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Assertion";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Subject of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Subject"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectType"];

  var x = function Subject(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Subject";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from SubjectConfirmation of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmation"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmationType"];

  var x = function SubjectConfirmation(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectConfirmation";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from SubjectConfirmationData of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmationData"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectConfirmationDataType"];

  var x = function SubjectConfirmationData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectConfirmationData";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Conditions of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Conditions"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionsType"];

  var x = function Conditions(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Conditions";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Condition of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Condition"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ConditionAbstractType"];

  var x = function Condition(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Condition";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AudienceRestriction of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AudienceRestriction"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AudienceRestrictionType"];

  var x = function AudienceRestriction(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AudienceRestriction";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Audience of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Audience"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function Audience(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Audience";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from OneTimeUse of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,OneTimeUse"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,OneTimeUseType"];

  var x = function OneTimeUse(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OneTimeUse";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from ProxyRestriction of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,ProxyRestriction"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ProxyRestrictionType"];

  var x = function ProxyRestriction(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ProxyRestriction";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Advice of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Advice"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AdviceType"];

  var x = function Advice(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Advice";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from EncryptedAssertion of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedAssertion"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedElementType"];

  var x = function EncryptedAssertion(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedAssertion";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Statement of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Statement"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,StatementAbstractType"];

  var x = function Statement(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Statement";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnStatement of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnStatement"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnStatementType"];

  var x = function AuthnStatement(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnStatement";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from SubjectLocality of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectLocality"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,SubjectLocalityType"];

  var x = function SubjectLocality(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SubjectLocality";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnContext of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContext"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContextType"];

  var x = function AuthnContext(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContext";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnContextClassRef of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContextClassRef"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AuthnContextClassRef(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContextClassRef";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnContextDeclRef of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContextDeclRef"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AuthnContextDeclRef(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContextDeclRef";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthnContextDecl of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthnContextDecl"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyType"];

  var x = function AuthnContextDecl(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnContextDecl";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthenticatingAuthority of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthenticatingAuthority"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AuthenticatingAuthority(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthenticatingAuthority";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AuthzDecisionStatement of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthzDecisionStatement"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AuthzDecisionStatementType"];

  var x = function AuthzDecisionStatement(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthzDecisionStatement";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Action of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Action"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,ActionType"];

  var x = function Action(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Action";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Evidence of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Evidence"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,EvidenceType"];

  var x = function Evidence(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Evidence";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AttributeStatement of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeStatement"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeStatementType"];

  var x = function AttributeStatement(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeStatement";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Attribute of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,Attribute"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeType"];

  var x = function Attribute(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Attribute";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from AttributeValue of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,AttributeValue"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyType"];

  var x = function AttributeValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeValue";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from EncryptedAttribute of urn:oasis:names:tc:SAML:2.0:assertion
definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedAttribute"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:assertion,EncryptedElementType"];

  var x = function EncryptedAttribute(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedAttribute";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:assertion";

  return x;
}());

// generated from Signature of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Signature"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignatureType"];

  var x = function Signature(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Signature";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignatureValue of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureValue"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignatureValueType"];

  var x = function SignatureValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureValue";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignedInfo of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignedInfo"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignedInfoType"];

  var x = function SignedInfo(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignedInfo";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from CanonicalizationMethod of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,CanonicalizationMethod"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,CanonicalizationMethodType"];

  var x = function CanonicalizationMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CanonicalizationMethod";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignatureMethod of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureMethod"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignatureMethodType"];

  var x = function SignatureMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureMethod";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from Reference of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Reference"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,ReferenceType"];

  var x = function Reference(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Reference";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from Transforms of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Transforms"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,TransformsType"];

  var x = function Transforms(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Transforms";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from Transform of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Transform"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,TransformType"];

  var x = function Transform(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Transform";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from DigestMethod of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DigestMethod"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,DigestMethodType"];

  var x = function DigestMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DigestMethod";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from DigestValue of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DigestValue"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,DigestValueType"];

  var x = function DigestValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DigestValue";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from KeyInfo of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,KeyInfo"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,KeyInfoType"];

  var x = function KeyInfo(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyInfo";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from KeyName of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,KeyName"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function KeyName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyName";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from MgmtData of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,MgmtData"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function MgmtData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "MgmtData";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from KeyValue of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,KeyValue"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,KeyValueType"];

  var x = function KeyValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyValue";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from RetrievalMethod of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,RetrievalMethod"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,RetrievalMethodType"];

  var x = function RetrievalMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RetrievalMethod";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from X509Data of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,X509Data"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,X509DataType"];

  var x = function X509Data(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "X509Data";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from PGPData of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,PGPData"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,PGPDataType"];

  var x = function PGPData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "PGPData";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SPKIData of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SPKIData"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SPKIDataType"];

  var x = function SPKIData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SPKIData";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from Object of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Object"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,ObjectType"];

  var x = function Object(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Object";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from Manifest of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,Manifest"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,ManifestType"];

  var x = function Manifest(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Manifest";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignatureProperties of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureProperties"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignaturePropertiesType"];

  var x = function SignatureProperties(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureProperties";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from SignatureProperty of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,SignatureProperty"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,SignaturePropertyType"];

  var x = function SignatureProperty(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SignatureProperty";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from DSAKeyValue of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,DSAKeyValue"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,DSAKeyValueType"];

  var x = function DSAKeyValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "DSAKeyValue";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from RSAKeyValue of http://www.w3.org/2000/09/xmldsig#
definitions["http://www.w3.org/2000/09/xmldsig#,RSAKeyValue"] = (function() {
  var base = definitions["http://www.w3.org/2000/09/xmldsig#,RSAKeyValueType"];

  var x = function RSAKeyValue(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RSAKeyValue";
  x.prototype.namespace = "http://www.w3.org/2000/09/xmldsig#";

  return x;
}());

// generated from CipherData of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,CipherData"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,CipherDataType"];

  var x = function CipherData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CipherData";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from CipherReference of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,CipherReference"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,CipherReferenceType"];

  var x = function CipherReference(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "CipherReference";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptedData of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedData"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedDataType"];

  var x = function EncryptedData(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedData";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptedKey of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedKey"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptedKeyType"];

  var x = function EncryptedKey(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptedKey";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from AgreementMethod of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,AgreementMethod"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,AgreementMethodType"];

  var x = function AgreementMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AgreementMethod";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptionProperties of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionProperties"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionPropertiesType"];

  var x = function EncryptionProperties(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionProperties";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from EncryptionProperty of http://www.w3.org/2001/04/xmlenc#
definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionProperty"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionPropertyType"];

  var x = function EncryptionProperty(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionProperty";
  x.prototype.namespace = "http://www.w3.org/2001/04/xmlenc#";

  return x;
}());

// generated from Extensions of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,Extensions"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,ExtensionsType"];

  var x = function Extensions(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Extensions";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from EntitiesDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntitiesDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntitiesDescriptorType"];

  var x = function EntitiesDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EntitiesDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from EntityDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntityDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EntityDescriptorType"];

  var x = function EntityDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EntityDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from Organization of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,Organization"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,OrganizationType"];

  var x = function Organization(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Organization";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from OrganizationName of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,OrganizationName"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedNameType"];

  var x = function OrganizationName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OrganizationName";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from OrganizationDisplayName of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,OrganizationDisplayName"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedNameType"];

  var x = function OrganizationDisplayName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OrganizationDisplayName";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from OrganizationURL of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,OrganizationURL"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedURIType"];

  var x = function OrganizationURL(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "OrganizationURL";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ContactPerson of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ContactPerson"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,ContactType"];

  var x = function ContactPerson(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ContactPerson";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from Company of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,Company"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function Company(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "Company";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from GivenName of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,GivenName"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function GivenName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "GivenName";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from SurName of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SurName"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function SurName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SurName";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from EmailAddress of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EmailAddress"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function EmailAddress(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EmailAddress";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from TelephoneNumber of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,TelephoneNumber"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,string"];

  var x = function TelephoneNumber(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "TelephoneNumber";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AdditionalMetadataLocation of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AdditionalMetadataLocation"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,AdditionalMetadataLocationType"];

  var x = function AdditionalMetadataLocation(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AdditionalMetadataLocation";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from RoleDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RoleDescriptorType"];

  var x = function RoleDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RoleDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from KeyDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,KeyDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,KeyDescriptorType"];

  var x = function KeyDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "KeyDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from EncryptionMethod of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,EncryptionMethod"] = (function() {
  var base = definitions["http://www.w3.org/2001/04/xmlenc#,EncryptionMethodType"];

  var x = function EncryptionMethod(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "EncryptionMethod";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ArtifactResolutionService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ArtifactResolutionService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,IndexedEndpointType"];

  var x = function ArtifactResolutionService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ArtifactResolutionService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from SingleLogoutService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SingleLogoutService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function SingleLogoutService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SingleLogoutService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ManageNameIDService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ManageNameIDService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function ManageNameIDService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ManageNameIDService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from NameIDFormat of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,NameIDFormat"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function NameIDFormat(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDFormat";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from IDPSSODescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,IDPSSODescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,IDPSSODescriptorType"];

  var x = function IDPSSODescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "IDPSSODescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from SingleSignOnService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SingleSignOnService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function SingleSignOnService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SingleSignOnService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from NameIDMappingService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,NameIDMappingService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function NameIDMappingService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "NameIDMappingService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AssertionIDRequestService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AssertionIDRequestService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function AssertionIDRequestService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionIDRequestService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AttributeProfile of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeProfile"] = (function() {
  var base = definitions["http://www.w3.org/2001/XMLSchema,anyURI"];

  var x = function AttributeProfile(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeProfile";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from SPSSODescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,SPSSODescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,SPSSODescriptorType"];

  var x = function SPSSODescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "SPSSODescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AssertionConsumerService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AssertionConsumerService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,IndexedEndpointType"];

  var x = function AssertionConsumerService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AssertionConsumerService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AttributeConsumingService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeConsumingService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeConsumingServiceType"];

  var x = function AttributeConsumingService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeConsumingService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ServiceName of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ServiceName"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedNameType"];

  var x = function ServiceName(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ServiceName";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from ServiceDescription of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,ServiceDescription"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,localizedNameType"];

  var x = function ServiceDescription(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "ServiceDescription";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from RequestedAttribute of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,RequestedAttribute"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,RequestedAttributeType"];

  var x = function RequestedAttribute(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "RequestedAttribute";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AuthnAuthorityDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AuthnAuthorityDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,AuthnAuthorityDescriptorType"];

  var x = function AuthnAuthorityDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnAuthorityDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AuthnQueryService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AuthnQueryService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function AuthnQueryService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthnQueryService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from PDPDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,PDPDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,PDPDescriptorType"];

  var x = function PDPDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "PDPDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AuthzService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AuthzService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function AuthzService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AuthzService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AttributeAuthorityDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeAuthorityDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeAuthorityDescriptorType"];

  var x = function AttributeAuthorityDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeAuthorityDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AttributeService of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AttributeService"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,EndpointType"];

  var x = function AttributeService(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AttributeService";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AffiliationDescriptor of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AffiliationDescriptor"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,AffiliationDescriptorType"];

  var x = function AffiliationDescriptor(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AffiliationDescriptor";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());

// generated from AffiliateMember of urn:oasis:names:tc:SAML:2.0:metadata
definitions["urn:oasis:names:tc:SAML:2.0:metadata,AffiliateMember"] = (function() {
  var base = definitions["urn:oasis:names:tc:SAML:2.0:metadata,entityIDType"];

  var x = function AffiliateMember(attributes, content) {
    attributes = attributes || {};

    base.call(this, attributes, content);
  };
  x.prototype = Object.create(base.prototype);

  x.prototype.tagName = "AffiliateMember";
  x.prototype.namespace = "urn:oasis:names:tc:SAML:2.0:metadata";

  return x;
}());
