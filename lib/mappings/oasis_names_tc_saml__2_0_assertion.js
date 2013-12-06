if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var oasis_names_tc_saml__2_0_assertion = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'oasis_names_tc_saml__2_0_assertion',
        defaultElementNamespaceURI: 'urn:oasis:names:tc:SAML:2.0:assertion',
        registerTypeInfos: function (context) {
            this.c({ localName: 'ConditionAbstractType' }, context);
            this.c({ localName: 'ConditionsType' }, context);
            this.c({ localName: 'AuthnContextType' }, context);
            this.c({ localName: 'SubjectConfirmationDataType' }, context);
            this.c({ localName: 'StatementAbstractType' }, context);
            this.c({ localName: 'SubjectConfirmationType' }, context);
            this.c({ localName: 'AuthnStatementType' }, context);
            this.c({ localName: 'NameIDType' }, context);
            this.c({ localName: 'AuthzDecisionStatementType' }, context);
            this.c({ localName: 'EncryptedElementType' }, context);
            this.c({ localName: 'ActionType' }, context);
            this.c({ localName: 'ProxyRestrictionType' }, context);
            this.c({ localName: 'AttributeType' }, context);
            this.c({ localName: 'AttributeStatementType' }, context);
            this.c({ localName: 'BaseIDAbstractType' }, context);
            this.c({ localName: 'OneTimeUseType' }, context);
            this.c({ localName: 'SubjectType' }, context);
            this.c({ localName: 'SubjectLocalityType' }, context);
            this.c({ localName: 'AdviceType' }, context);
            this.c({ localName: 'AssertionType' }, context);
            this.c({ localName: 'EvidenceType' }, context);
            this.c({ localName: 'AudienceRestrictionType' }, context);
            this.c({ localName: 'KeyInfoConfirmationDataType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType').ps().es({
                name: 'conditionOrAudienceRestrictionOrOneTimeUse',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'ProxyRestriction',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ProxyRestrictionType')
                    },
                    {
                        elementName: 'OneTimeUse',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.OneTimeUseType')
                    },
                    {
                        elementName: 'Condition',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ConditionAbstractType')
                    },
                    {
                        elementName: 'AudienceRestriction',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AudienceRestrictionType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType').ps().a({
                name: 'notBefore',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'NotBefore'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType').ps().a({
                name: 'notOnOrAfter',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'NotOnOrAfter'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnContextType').ps().ers({
                name: 'content',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'AuthnContextDecl',
                        typeInfo: Jsonix.Schema.XSD.AnyType.INSTANCE
                    },
                    { elementName: 'AuthnContextClassRef' },
                    { elementName: 'AuthnContextDeclRef' },
                    { elementName: 'AuthenticatingAuthority' }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().a({
                name: 'notBefore',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'NotBefore'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().a({
                name: 'notOnOrAfter',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'NotOnOrAfter'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().a({
                name: 'recipient',
                attributeName: 'Recipient'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().a({
                name: 'inResponseTo',
                attributeName: 'InResponseTo'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType').ps().a({
                name: 'address',
                attributeName: 'Address'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType').ps().e({
                name: 'baseID',
                elementName: 'BaseID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType').ps().e({
                name: 'nameID',
                elementName: 'NameID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType').ps().e({
                name: 'encryptedID',
                elementName: 'EncryptedID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType').ps().e({
                name: 'subjectConfirmationData',
                elementName: 'SubjectConfirmationData',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType').ps().a({
                name: 'method',
                attributeName: 'Method'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').b(context.ti('oasis_names_tc_saml__2_0_assertion.StatementAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').ps().e({
                name: 'subjectLocality',
                elementName: 'SubjectLocality',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectLocalityType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').ps().e({
                name: 'authnContext',
                elementName: 'AuthnContext',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthnContextType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').ps().a({
                name: 'authnInstant',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'AuthnInstant'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').ps().a({
                name: 'sessionIndex',
                attributeName: 'SessionIndex'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType').ps().a({
                name: 'sessionNotOnOrAfter',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'SessionNotOnOrAfter'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType').ps().a({
                name: 'format',
                attributeName: 'Format'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType').ps().a({
                name: 'spProvidedID',
                attributeName: 'SPProvidedID'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType').ps().a({
                name: 'nameQualifier',
                attributeName: 'NameQualifier'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType').ps().a({
                name: 'spNameQualifier',
                attributeName: 'SPNameQualifier'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType').b(context.ti('oasis_names_tc_saml__2_0_assertion.StatementAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType').ps().e({
                name: 'action',
                collection: true,
                elementName: 'Action',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ActionType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType').ps().e({
                name: 'evidence',
                elementName: 'Evidence',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EvidenceType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType').ps().a({
                name: 'resource',
                attributeName: 'Resource'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType').ps().a({
                name: 'decision',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'Decision'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType').ps().e({
                name: 'encryptedData',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2001/04/xmlenc#', 'EncryptedData'),
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptedDataType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType').ps().e({
                name: 'encryptedKey',
                collection: true,
                elementName: new Jsonix.XML.QName('http://www.w3.org/2001/04/xmlenc#', 'EncryptedKey'),
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.ActionType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_saml__2_0_assertion.ActionType').ps().a({
                name: 'namespace',
                attributeName: 'Namespace'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.ProxyRestrictionType').b(context.ti('oasis_names_tc_saml__2_0_assertion.ConditionAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.ProxyRestrictionType').ps().e({
                name: 'audience',
                collection: true,
                elementName: 'Audience'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.ProxyRestrictionType').ps().a({
                name: 'count',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                attributeName: 'Count'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType').ps().e({
                name: 'attributeValue',
                collection: true,
                elementName: 'AttributeValue',
                typeInfo: Jsonix.Schema.XSD.AnyType.INSTANCE
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType').ps().a({
                name: 'name',
                attributeName: 'Name'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType').ps().a({
                name: 'nameFormat',
                attributeName: 'NameFormat'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType').ps().a({
                name: 'friendlyName',
                attributeName: 'FriendlyName'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeStatementType').b(context.ti('oasis_names_tc_saml__2_0_assertion.StatementAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.AttributeStatementType').ps().es({
                name: 'attributeOrEncryptedAttribute',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'Attribute',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType')
                    },
                    {
                        elementName: 'EncryptedAttribute',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType').ps().a({
                name: 'nameQualifier',
                attributeName: 'NameQualifier'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType').ps().a({
                name: 'spNameQualifier',
                attributeName: 'SPNameQualifier'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.OneTimeUseType').b(context.ti('oasis_names_tc_saml__2_0_assertion.ConditionAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectType').ps().ers({
                name: 'content',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'NameID',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
                    },
                    {
                        elementName: 'EncryptedID',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
                    },
                    {
                        elementName: 'SubjectConfirmation',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType')
                    },
                    {
                        elementName: 'BaseID',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectLocalityType').ps().a({
                name: 'address',
                attributeName: 'Address'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.SubjectLocalityType').ps().a({
                name: 'dnsName',
                attributeName: 'DNSName'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AdviceType').ps().ers({
                name: 'assertionIDRefOrAssertionURIRefOrAssertion',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'Assertion',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType')
                    },
                    {
                        elementName: 'EncryptedAssertion',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
                    },
                    { elementName: 'AssertionURIRef' },
                    { elementName: 'AssertionIDRef' }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().e({
                name: 'issuer',
                elementName: 'Issuer',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().e({
                name: 'subject',
                elementName: 'Subject',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().e({
                name: 'conditions',
                elementName: 'Conditions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().e({
                name: 'advice',
                elementName: 'Advice',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AdviceType')
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().es({
                name: 'statementOrAuthnStatementOrAuthzDecisionStatement',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'AuthnStatement',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType')
                    },
                    {
                        elementName: 'AuthzDecisionStatement',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType')
                    },
                    {
                        elementName: 'AttributeStatement',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeStatementType')
                    },
                    {
                        elementName: 'Statement',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.StatementAbstractType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType').ps().a({
                name: 'issueInstant',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'IssueInstant'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.EvidenceType').ps().ers({
                name: 'assertionIDRefOrAssertionURIRefOrAssertion',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'Assertion',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType')
                    },
                    {
                        elementName: 'EncryptedAssertion',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
                    },
                    { elementName: 'AssertionURIRef' },
                    { elementName: 'AssertionIDRef' }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.AudienceRestrictionType').b(context.ti('oasis_names_tc_saml__2_0_assertion.ConditionAbstractType'));
            context.ti('oasis_names_tc_saml__2_0_assertion.AudienceRestrictionType').ps().e({
                name: 'audience',
                collection: true,
                elementName: 'Audience'
            });
            context.ti('oasis_names_tc_saml__2_0_assertion.KeyInfoConfirmationDataType').b(context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType'));
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'Assertion',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AssertionType')
            }, context);
            this.e({
                elementName: 'AuthnContext',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthnContextType')
            }, context);
            this.e({
                elementName: 'EncryptedID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            }, context);
            this.e({
                elementName: 'Issuer',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            }, context);
            this.e({
                elementName: 'NameID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.NameIDType')
            }, context);
            this.e({
                elementName: 'EncryptedAssertion',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            }, context);
            this.e({
                elementName: 'SubjectLocality',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectLocalityType')
            }, context);
            this.e({
                elementName: 'Evidence',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EvidenceType')
            }, context);
            this.e({
                elementName: 'Statement',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.StatementAbstractType')
            }, context);
            this.e({
                elementName: 'Conditions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ConditionsType')
            }, context);
            this.e({
                elementName: 'AttributeValue',
                typeInfo: Jsonix.Schema.XSD.AnyType.INSTANCE
            }, context);
            this.e({
                elementName: 'AssertionURIRef',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AssertionIDRef',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'ProxyRestriction',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ProxyRestrictionType')
            }, context);
            this.e({
                elementName: 'AudienceRestriction',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AudienceRestrictionType')
            }, context);
            this.e({
                elementName: 'Condition',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ConditionAbstractType')
            }, context);
            this.e({
                elementName: 'AuthnStatement',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthnStatementType')
            }, context);
            this.e({
                elementName: 'SubjectConfirmation',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationType')
            }, context);
            this.e({
                elementName: 'AuthenticatingAuthority',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AttributeStatement',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeStatementType')
            }, context);
            this.e({
                elementName: 'Attribute',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType')
            }, context);
            this.e({
                elementName: 'AuthnContextDecl',
                typeInfo: Jsonix.Schema.XSD.AnyType.INSTANCE
            }, context);
            this.e({
                elementName: 'Subject',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectType')
            }, context);
            this.e({
                elementName: 'Advice',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AdviceType')
            }, context);
            this.e({
                elementName: 'SubjectConfirmationData',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.SubjectConfirmationDataType')
            }, context);
            this.e({
                elementName: 'AuthnContextClassRef',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'Audience',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'Action',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.ActionType')
            }, context);
            this.e({
                elementName: 'AuthzDecisionStatement',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AuthzDecisionStatementType')
            }, context);
            this.e({
                elementName: 'AuthnContextDeclRef',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'OneTimeUse',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.OneTimeUseType')
            }, context);
            this.e({
                elementName: 'EncryptedAttribute',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.EncryptedElementType')
            }, context);
            this.e({
                elementName: 'BaseID',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.BaseIDAbstractType')
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.oasis_names_tc_saml__2_0_assertion = oasis_names_tc_saml__2_0_assertion;
}