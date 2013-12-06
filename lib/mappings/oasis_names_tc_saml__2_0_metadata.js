if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var oasis_names_tc_saml__2_0_metadata = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'oasis_names_tc_saml__2_0_metadata',
        defaultElementNamespaceURI: 'urn:oasis:names:tc:SAML:2.0:metadata',
        registerTypeInfos: function (context) {
            this.c({ localName: 'EndpointType' }, context);
            this.c({ localName: 'IndexedEndpointType' }, context);
            this.c({ localName: 'EntitiesDescriptorType' }, context);
            this.c({ localName: 'RequestedAttributeType' }, context);
            this.c({ localName: 'OrganizationType' }, context);
            this.c({ localName: 'KeyDescriptorType' }, context);
            this.c({ localName: 'LocalizedNameType' }, context);
            this.c({ localName: 'AttributeAuthorityDescriptorType' }, context);
            this.c({ localName: 'AuthnAuthorityDescriptorType' }, context);
            this.c({ localName: 'RoleDescriptorType' }, context);
            this.c({ localName: 'AttributeConsumingServiceType' }, context);
            this.c({ localName: 'AdditionalMetadataLocationType' }, context);
            this.c({ localName: 'AffiliationDescriptorType' }, context);
            this.c({ localName: 'ExtensionsType' }, context);
            this.c({ localName: 'ContactType' }, context);
            this.c({ localName: 'LocalizedURIType' }, context);
            this.c({ localName: 'SPSSODescriptorType' }, context);
            this.c({ localName: 'PDPDescriptorType' }, context);
            this.c({ localName: 'EntityDescriptorType' }, context);
            this.c({ localName: 'IDPSSODescriptorType' }, context);
            this.c({ localName: 'SSODescriptorType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType').ps().ae({
                name: 'any',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType').ps().a({
                name: 'binding',
                attributeName: 'Binding'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType').ps().a({
                name: 'location',
                attributeName: 'Location'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType').ps().a({
                name: 'responseLocation',
                attributeName: 'ResponseLocation'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType').b(context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType').ps().a({
                name: 'index',
                typeInfo: Jsonix.Schema.XSD.Int.INSTANCE,
                attributeName: 'index'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType').ps().a({
                name: 'isDefault',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'isDefault'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().es({
                name: 'entityDescriptorOrEntitiesDescriptor',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'EntityDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType')
                    },
                    {
                        elementName: 'EntitiesDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().a({
                name: 'validUntil',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'validUntil'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().a({
                name: 'cacheDuration',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'cacheDuration'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType').ps().a({
                name: 'name',
                attributeName: 'Name'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RequestedAttributeType').b(context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.RequestedAttributeType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.RequestedAttributeType').ps().a({
                name: 'isRequired',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'isRequired'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType').ps().e({
                name: 'organizationName',
                collection: true,
                elementName: 'OrganizationName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType').ps().e({
                name: 'organizationDisplayName',
                collection: true,
                elementName: 'OrganizationDisplayName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType').ps().e({
                name: 'organizationURL',
                collection: true,
                elementName: 'OrganizationURL',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedURIType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType').ps().e({
                name: 'keyInfo',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'KeyInfo'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType').ps().e({
                name: 'encryptionMethod',
                collection: true,
                elementName: 'EncryptionMethod',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType').ps().a({
                name: 'use',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'use'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType').ps().a({
                name: 'lang',
                attributeName: new Jsonix.XML.QName('http://www.w3.org/XML/1998/namespace', 'lang')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().e({
                name: 'attributeService',
                collection: true,
                elementName: 'AttributeService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().e({
                name: 'assertionIDRequestService',
                collection: true,
                elementName: 'AssertionIDRequestService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().e({
                name: 'nameIDFormat',
                collection: true,
                elementName: 'NameIDFormat'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().e({
                name: 'attributeProfile',
                collection: true,
                elementName: 'AttributeProfile'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType').ps().e({
                name: 'attribute',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Attribute'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType').ps().e({
                name: 'authnQueryService',
                collection: true,
                elementName: 'AuthnQueryService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType').ps().e({
                name: 'assertionIDRequestService',
                collection: true,
                elementName: 'AssertionIDRequestService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType').ps().e({
                name: 'nameIDFormat',
                collection: true,
                elementName: 'NameIDFormat'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().e({
                name: 'keyDescriptor',
                collection: true,
                elementName: 'KeyDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().e({
                name: 'organization',
                elementName: 'Organization',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().e({
                name: 'contactPerson',
                collection: true,
                elementName: 'ContactPerson',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ContactType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().a({
                name: 'validUntil',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'validUntil'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().a({
                name: 'cacheDuration',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'cacheDuration'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().a({
                name: 'protocolSupportEnumeration',
                typeInfo: new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.String.INSTANCE),
                attributeName: 'protocolSupportEnumeration'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType').ps().a({
                name: 'errorURL',
                attributeName: 'errorURL'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType').ps().e({
                name: 'serviceName',
                collection: true,
                elementName: 'ServiceName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType').ps().e({
                name: 'serviceDescription',
                collection: true,
                elementName: 'ServiceDescription',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType').ps().e({
                name: 'requestedAttribute',
                collection: true,
                elementName: 'RequestedAttribute',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.RequestedAttributeType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType').ps().a({
                name: 'index',
                typeInfo: Jsonix.Schema.XSD.Int.INSTANCE,
                attributeName: 'index'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType').ps().a({
                name: 'isDefault',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'isDefault'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AdditionalMetadataLocationType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_saml__2_0_metadata.AdditionalMetadataLocationType').ps().a({
                name: 'namespace',
                attributeName: 'namespace'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().e({
                name: 'affiliateMember',
                collection: true,
                elementName: 'AffiliateMember'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().e({
                name: 'keyDescriptor',
                collection: true,
                elementName: 'KeyDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().a({
                name: 'affiliationOwnerID',
                attributeName: 'affiliationOwnerID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().a({
                name: 'validUntil',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'validUntil'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().a({
                name: 'cacheDuration',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'cacheDuration'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType').ps().ae({
                name: 'any',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'company',
                elementName: 'Company'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'givenName',
                elementName: 'GivenName'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'surName',
                elementName: 'SurName'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'emailAddress',
                collection: true,
                elementName: 'EmailAddress'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().e({
                name: 'telephoneNumber',
                collection: true,
                elementName: 'TelephoneNumber'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.ContactType').ps().a({
                name: 'contactType',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'contactType'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedURIType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedURIType').ps().a({
                name: 'lang',
                attributeName: new Jsonix.XML.QName('http://www.w3.org/XML/1998/namespace', 'lang')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').ps().e({
                name: 'assertionConsumerService',
                collection: true,
                elementName: 'AssertionConsumerService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').ps().e({
                name: 'attributeConsumingService',
                collection: true,
                elementName: 'AttributeConsumingService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').ps().a({
                name: 'authnRequestsSigned',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'AuthnRequestsSigned'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType').ps().a({
                name: 'wantAssertionsSigned',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'WantAssertionsSigned'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType').ps().e({
                name: 'authzService',
                collection: true,
                elementName: 'AuthzService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType').ps().e({
                name: 'assertionIDRequestService',
                collection: true,
                elementName: 'AssertionIDRequestService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType').ps().e({
                name: 'nameIDFormat',
                collection: true,
                elementName: 'NameIDFormat'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'signature',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Signature'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'extensions',
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().es({
                name: 'roleDescriptorOrIDPSSODescriptorOrSPSSODescriptor',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'AuthnAuthorityDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType')
                    },
                    {
                        elementName: 'SPSSODescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType')
                    },
                    {
                        elementName: 'IDPSSODescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType')
                    },
                    {
                        elementName: 'AttributeAuthorityDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType')
                    },
                    {
                        elementName: 'RoleDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType')
                    },
                    {
                        elementName: 'PDPDescriptor',
                        typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType')
                    }
                ]
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'affiliationDescriptor',
                elementName: 'AffiliationDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'organization',
                elementName: 'Organization',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'contactPerson',
                collection: true,
                elementName: 'ContactPerson',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ContactType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().e({
                name: 'additionalMetadataLocation',
                collection: true,
                elementName: 'AdditionalMetadataLocation',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AdditionalMetadataLocationType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().a({
                name: 'entityID',
                attributeName: 'entityID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().a({
                name: 'validUntil',
                typeInfo: Jsonix.Schema.XSD.Calendar.INSTANCE,
                attributeName: 'validUntil'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().a({
                name: 'cacheDuration',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'cacheDuration'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'ID'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().e({
                name: 'singleSignOnService',
                collection: true,
                elementName: 'SingleSignOnService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().e({
                name: 'nameIDMappingService',
                collection: true,
                elementName: 'NameIDMappingService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().e({
                name: 'assertionIDRequestService',
                collection: true,
                elementName: 'AssertionIDRequestService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().e({
                name: 'attributeProfile',
                collection: true,
                elementName: 'AttributeProfile'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().e({
                name: 'attribute',
                collection: true,
                elementName: new Jsonix.XML.QName('urn:oasis:names:tc:SAML:2.0:assertion', 'Attribute'),
                typeInfo: context.ti('oasis_names_tc_saml__2_0_assertion.AttributeType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType').ps().a({
                name: 'wantAuthnRequestsSigned',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'WantAuthnRequestsSigned'
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').b(context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType'));
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').ps().e({
                name: 'artifactResolutionService',
                collection: true,
                elementName: 'ArtifactResolutionService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').ps().e({
                name: 'singleLogoutService',
                collection: true,
                elementName: 'SingleLogoutService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').ps().e({
                name: 'manageNameIDService',
                collection: true,
                elementName: 'ManageNameIDService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            });
            context.ti('oasis_names_tc_saml__2_0_metadata.SSODescriptorType').ps().e({
                name: 'nameIDFormat',
                collection: true,
                elementName: 'NameIDFormat'
            });
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'SPSSODescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.SPSSODescriptorType')
            }, context);
            this.e({
                elementName: 'IDPSSODescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IDPSSODescriptorType')
            }, context);
            this.e({
                elementName: 'SingleLogoutService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'EntitiesDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EntitiesDescriptorType')
            }, context);
            this.e({
                elementName: 'AttributeService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'RequestedAttribute',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.RequestedAttributeType')
            }, context);
            this.e({
                elementName: 'AuthzService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'AuthnQueryService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'ManageNameIDService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'SurName',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AuthnAuthorityDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AuthnAuthorityDescriptorType')
            }, context);
            this.e({
                elementName: 'AttributeConsumingService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AttributeConsumingServiceType')
            }, context);
            this.e({
                elementName: 'Company',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AdditionalMetadataLocation',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AdditionalMetadataLocationType')
            }, context);
            this.e({
                elementName: 'OrganizationDisplayName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            }, context);
            this.e({
                elementName: 'ServiceDescription',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            }, context);
            this.e({
                elementName: 'Extensions',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ExtensionsType')
            }, context);
            this.e({
                elementName: 'OrganizationURL',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedURIType')
            }, context);
            this.e({
                elementName: 'Organization',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.OrganizationType')
            }, context);
            this.e({
                elementName: 'EncryptionMethod',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType')
            }, context);
            this.e({
                elementName: 'AttributeProfile',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'SingleSignOnService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'TelephoneNumber',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AffiliationDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AffiliationDescriptorType')
            }, context);
            this.e({
                elementName: 'ContactPerson',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.ContactType')
            }, context);
            this.e({
                elementName: 'EntityDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EntityDescriptorType')
            }, context);
            this.e({
                elementName: 'AffiliateMember',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'GivenName',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'ServiceName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            }, context);
            this.e({
                elementName: 'RoleDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.RoleDescriptorType')
            }, context);
            this.e({
                elementName: 'AttributeAuthorityDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.AttributeAuthorityDescriptorType')
            }, context);
            this.e({
                elementName: 'PDPDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.PDPDescriptorType')
            }, context);
            this.e({
                elementName: 'OrganizationName',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.LocalizedNameType')
            }, context);
            this.e({
                elementName: 'NameIDFormat',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'NameIDMappingService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'ArtifactResolutionService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType')
            }, context);
            this.e({
                elementName: 'AssertionConsumerService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.IndexedEndpointType')
            }, context);
            this.e({
                elementName: 'KeyDescriptor',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.KeyDescriptorType')
            }, context);
            this.e({
                elementName: 'AssertionIDRequestService',
                typeInfo: context.ti('oasis_names_tc_saml__2_0_metadata.EndpointType')
            }, context);
            this.e({
                elementName: 'EmailAddress',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.oasis_names_tc_saml__2_0_metadata = oasis_names_tc_saml__2_0_metadata;
}