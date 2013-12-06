if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var oasis_names_tc_saml__2_0_protocol = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'oasis_names_tc_saml__2_0_protocol',
        defaultElementNamespaceURI: 'urn:oasis:names:tc:SAML:2.0:protocol',
        registerTypeInfos: function (context) {
            this.c({ localName: 'StatusCodeType' }, context);
            this.c({ localName: 'StatusResponseType' }, context);
            this.c({ localName: 'ArtifactResolveType' }, context);
            this.c({ localName: 'IDPEntryType' }, context);
            this.c({ localName: 'ManageNameIDRequestType' }, context);
            this.c({ localName: 'RequestedAuthnContextType' }, context);
            this.c({ localName: 'LogoutRequestType' }, context);
            this.c({ localName: 'ArtifactResponseType' }, context);
            this.c({ localName: 'ExtensionsType' }, context);
            this.c({ localName: 'TerminateType' }, context);
            this.c({ localName: 'NameIDMappingResponseType' }, context);
            this.c({ localName: 'AuthzDecisionQueryType' }, context);
            this.c({ localName: 'NameIDPolicyType' }, context);
            this.c({ localName: 'ScopingType' }, context);
            this.c({ localName: 'ResponseType' }, context);
            this.c({ localName: 'StatusType' }, context);
            this.c({ localName: 'AuthnRequestType' }, context);
            this.c({ localName: 'AssertionIDRequestType' }, context);
            this.c({ localName: 'SubjectQueryAbstractType' }, context);
            this.c({ localName: 'IDPListType' }, context);
            this.c({ localName: 'StatusDetailType' }, context);
            this.c({ localName: 'AuthnQueryType' }, context);
            this.c({ localName: 'AttributeQueryType' }, context);
            this.c({ localName: 'NameIDMappingRequestType' }, context);
            this.c({ localName: 'RequestAbstractType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusCodeType').ps().e({
                name: 'statusCode',
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusCodeType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusCodeType').ps().a({
                name: 'value',
                attributeName: 'Value'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().e({
                name: 'issuer',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Issuer'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().e({
                name: 'status',
                elementName: 'Status',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'inResponseTo',
                attributeName: 'InResponseTo'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'issueInstant',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'IssueInstant'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'destination',
                attributeName: 'Destination'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType').ps().a({
                name: 'consent',
                attributeName: 'Consent'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResolveType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResolveType').ps().e({
                name: 'artifact',
                elementName: 'Artifact'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.IDPEntryType').ps().a({
                name: 'providerID',
                attributeName: 'ProviderID'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.IDPEntryType').ps().a({
                name: 'name',
                attributeName: 'Name'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.IDPEntryType').ps().a({
                name: 'loc',
                attributeName: 'Loc'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').ps().e({
                name: 'nameID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'NameID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').ps().e({
                name: 'encryptedID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'EncryptedID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').ps().e({
                name: 'newID',
                elementName: 'NewID'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').ps().e({
                name: 'newEncryptedID',
                elementName: 'NewEncryptedID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType').ps().e({
                name: 'terminate',
                elementName: 'Terminate',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.TerminateType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType').ps().e({
                name: 'authnContextClassRef',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'AuthnContextClassRef')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType').ps().e({
                name: 'authnContextDeclRef',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'AuthnContextDeclRef')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType').ps().a({
                name: 'comparison',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'Comparison'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().e({
                name: 'baseID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'BaseID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().e({
                name: 'nameID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'NameID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().e({
                name: 'encryptedID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'EncryptedID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().e({
                name: 'sessionIndex',
                collection: true,
                elementName: 'SessionIndex'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().a({
                name: 'reason',
                attributeName: 'Reason'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType').ps().a({
                name: 'notOnOrAfter',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'NotOnOrAfter'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResponseType').b(context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResponseType').ps().ae({
                name: 'any',
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ExtensionsType').ps().ae({
                name: 'any',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingResponseType').b(context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingResponseType').ps().e({
                name: 'nameID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'NameID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingResponseType').ps().e({
                name: 'encryptedID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'EncryptedID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthzDecisionQueryType').b(context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthzDecisionQueryType').ps().e({
                name: 'action',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Action'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ActionType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthzDecisionQueryType').ps().e({
                name: 'evidence',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Evidence'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EvidenceType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthzDecisionQueryType').ps().a({
                name: 'resource',
                attributeName: 'Resource'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType').ps().a({
                name: 'format',
                attributeName: 'Format'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType').ps().a({
                name: 'spNameQualifier',
                attributeName: 'SPNameQualifier'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType').ps().a({
                name: 'allowCreate',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'AllowCreate'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ScopingType').ps().e({
                name: 'idpList',
                elementName: 'IDPList',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.IDPListType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ScopingType').ps().e({
                name: 'requesterID',
                collection: true,
                elementName: 'RequesterID'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ScopingType').ps().a({
                name: 'proxyCount',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                attributeName: 'ProxyCount'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.ResponseType').b(context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.ResponseType').ps().es({
                name: 'assertionOrEncryptedAssertion',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'EncryptedAssertion'),
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
                    },
                    {
                        elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Assertion'),
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusType').ps().e({
                name: 'statusCode',
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusCodeType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusType').ps().e({
                name: 'statusMessage',
                elementName: 'StatusMessage'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusType').ps().e({
                name: 'statusDetail',
                elementName: 'StatusDetail',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusDetailType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().e({
                name: 'subject',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Subject'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().e({
                name: 'nameIDPolicy',
                elementName: 'NameIDPolicy',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().e({
                name: 'conditions',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Conditions'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().e({
                name: 'requestedAuthnContext',
                elementName: 'RequestedAuthnContext',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().e({
                name: 'scoping',
                elementName: 'Scoping',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ScopingType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'forceAuthn',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'ForceAuthn'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'isPassive',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'IsPassive'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'protocolBinding',
                attributeName: 'ProtocolBinding'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'assertionConsumerServiceIndex',
                typeInfo: Jsonix.Schema.XSD.Int.INSTANCE,
                attributeName: 'AssertionConsumerServiceIndex'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'assertionConsumerServiceURL',
                attributeName: 'AssertionConsumerServiceURL'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'attributeConsumingServiceIndex',
                typeInfo: Jsonix.Schema.XSD.Int.INSTANCE,
                attributeName: 'AttributeConsumingServiceIndex'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType').ps().a({
                name: 'providerName',
                attributeName: 'ProviderName'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AssertionIDRequestType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.AssertionIDRequestType').ps().e({
                name: 'assertionIDRef',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'AssertionIDRef')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType').ps().e({
                name: 'subject',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Subject'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.IDPListType').ps().e({
                name: 'idpEntry',
                collection: true,
                elementName: 'IDPEntry',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.IDPEntryType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.IDPListType').ps().e({
                name: 'getComplete',
                elementName: 'GetComplete'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.StatusDetailType').ps().ae({
                name: 'any',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnQueryType').b(context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnQueryType').ps().e({
                name: 'requestedAuthnContext',
                elementName: 'RequestedAuthnContext',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AuthnQueryType').ps().a({
                name: 'sessionIndex',
                attributeName: 'SessionIndex'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.AttributeQueryType').b(context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.AttributeQueryType').ps().e({
                name: 'attribute',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Attribute'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType').b(context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType').ps().e({
                name: 'baseID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'BaseID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType').ps().e({
                name: 'nameID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'NameID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType').ps().e({
                name: 'encryptedID',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'EncryptedID'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType').ps().e({
                name: 'nameIDPolicy',
                elementName: 'NameIDPolicy',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().e({
                name: 'issuer',
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Issuer'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().a({
                name: 'issueInstant',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'IssueInstant'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().a({
                name: 'destination',
                attributeName: 'Destination'
            });
            context.ti('oasis_names_tc_saml__2_0_protocol.RequestAbstractType').ps().a({
                name: 'consent',
                attributeName: 'Consent'
            });
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'AuthzDecisionQuery',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.AuthzDecisionQueryType')
            }, context);
            this.e({
                elementName: 'Response',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ResponseType')
            }, context);
            this.e({
                elementName: 'AssertionIDRequest',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.AssertionIDRequestType')
            }, context);
            this.e({
                elementName: 'SubjectQuery',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.SubjectQueryAbstractType')
            }, context);
            this.e({
                elementName: 'AttributeQuery',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.AttributeQueryType')
            }, context);
            this.e({
                elementName: 'RequesterID',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'ManageNameIDResponse',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType')
            }, context);
            this.e({
                elementName: 'ManageNameIDRequest',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ManageNameIDRequestType')
            }, context);
            this.e({
                elementName: 'RequestedAuthnContext',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.RequestedAuthnContextType')
            }, context);
            this.e({
                elementName: 'NameIDMappingResponse',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingResponseType')
            }, context);
            this.e({
                elementName: 'NameIDPolicy',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.NameIDPolicyType')
            }, context);
            this.e({
                elementName: 'SessionIndex',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'StatusMessage',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'StatusDetail',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusDetailType')
            }, context);
            this.e({
                elementName: 'ArtifactResolve',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResolveType')
            }, context);
            this.e({
                elementName: 'IDPEntry',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.IDPEntryType')
            }, context);
            this.e({
                elementName: 'NewEncryptedID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            }, context);
            this.e({
                elementName: 'Scoping',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ScopingType')
            }, context);
            this.e({
                elementName: 'Terminate',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.TerminateType')
            }, context);
            this.e({
                elementName: 'Status',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusType')
            }, context);
            this.e({
                elementName: 'AuthnQuery',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.AuthnQueryType')
            }, context);
            this.e({
                elementName: 'NameIDMappingRequest',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.NameIDMappingRequestType')
            }, context);
            this.e({
                elementName: 'IDPList',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.IDPListType')
            }, context);
            this.e({
                elementName: 'LogoutResponse',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusResponseType')
            }, context);
            this.e({
                elementName: 'LogoutRequest',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.LogoutRequestType')
            }, context);
            this.e({
                elementName: 'ArtifactResponse',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ArtifactResponseType')
            }, context);
            this.e({
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.ExtensionsType')
            }, context);
            this.e({
                elementName: 'GetComplete',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'Artifact',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AuthnRequest',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.AuthnRequestType')
            }, context);
            this.e({
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_protocol.StatusCodeType')
            }, context);
            this.e({
                elementName: 'NewID',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.oasis_names_tc_saml__2_0_protocol = oasis_names_tc_saml__2_0_protocol;
}