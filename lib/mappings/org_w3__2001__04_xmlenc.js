if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var org_w3__2001__04_xmlenc = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'org_w3__2001__04_xmlenc',
        defaultElementNamespaceURI: 'http://www.w3.org/2001/04/xmlenc#',
        registerTypeInfos: function (context) {
            this.c({ localName: 'ReferenceList' }, context);
            this.c({ localName: 'ReferenceType' }, context);
            this.c({ localName: 'AgreementMethodType' }, context);
            this.c({ localName: 'CipherReferenceType' }, context);
            this.c({ localName: 'EncryptedKeyType' }, context);
            this.c({ localName: 'CipherDataType' }, context);
            this.c({ localName: 'EncryptionPropertyType' }, context);
            this.c({ localName: 'EncryptionPropertiesType' }, context);
            this.c({ localName: 'EncryptedDataType' }, context);
            this.c({ localName: 'EncryptedType' }, context);
            this.c({ localName: 'EncryptionMethodType' }, context);
            this.c({ localName: 'TransformsType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('org_w3__2001__04_xmlenc.ReferenceList').ps().ers({
                name: 'dataReferenceOrKeyReference',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'KeyReference',
                        typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceType')
                    },
                    {
                        elementName: 'DataReference',
                        typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceType')
                    }
                ]
            });
            context.ti('org_w3__2001__04_xmlenc.ReferenceType').ps().ae({
                name: 'any',
                collection: true,
                typedObjectAllowed: true
            });
            context.ti('org_w3__2001__04_xmlenc.ReferenceType').ps().a({
                name: 'uri',
                attributeName: 'URI'
            });
            context.ti('org_w3__2001__04_xmlenc.AgreementMethodType').ps().ers({
                name: 'content',
                collection: true,
                mixed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'OriginatorKeyInfo',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
                    },
                    {
                        elementName: 'KA-Nonce',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    },
                    {
                        elementName: 'RecipientKeyInfo',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
                    }
                ]
            });
            context.ti('org_w3__2001__04_xmlenc.AgreementMethodType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2001__04_xmlenc.CipherReferenceType').ps().e({
                name: 'transforms',
                elementName: 'Transforms',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.TransformsType')
            });
            context.ti('org_w3__2001__04_xmlenc.CipherReferenceType').ps().a({
                name: 'uri',
                attributeName: 'URI'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType').b(context.ti('org_w3__2001__04_xmlenc.EncryptedType'));
            context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType').ps().e({
                name: 'referenceList',
                elementName: 'ReferenceList',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceList')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType').ps().e({
                name: 'carriedKeyName',
                elementName: 'CarriedKeyName'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType').ps().a({
                name: 'recipient',
                attributeName: 'Recipient'
            });
            context.ti('org_w3__2001__04_xmlenc.CipherDataType').ps().e({
                name: 'cipherValue',
                elementName: 'CipherValue',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2001__04_xmlenc.CipherDataType').ps().e({
                name: 'cipherReference',
                elementName: 'CipherReference',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.CipherReferenceType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType').ps().aa({ name: 'otherAttributes' });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType').ps().a({
                name: 'target',
                attributeName: 'Target'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertiesType').ps().e({
                name: 'encryptionProperty',
                collection: true,
                elementName: 'EncryptionProperty',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionPropertiesType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedDataType').b(context.ti('org_w3__2001__04_xmlenc.EncryptedType'));
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().e({
                name: 'encryptionMethod',
                elementName: 'EncryptionMethod',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().e({
                name: 'keyInfo',
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'KeyInfo'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().e({
                name: 'cipherData',
                elementName: 'CipherData',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.CipherDataType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().e({
                name: 'encryptionProperties',
                elementName: 'EncryptionProperties',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionPropertiesType')
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().a({
                name: 'type',
                attributeName: 'Type'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().a({
                name: 'mimeType',
                attributeName: 'MimeType'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptedType').ps().a({
                name: 'encoding',
                attributeName: 'Encoding'
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType').ps().ers({
                name: 'content',
                collection: true,
                mixed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'KeySize',
                        typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE
                    },
                    {
                        elementName: 'OAEPparams',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    }
                ]
            });
            context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2001__04_xmlenc.TransformsType').ps().e({
                name: 'transform',
                collection: true,
                elementName: new Jsonix.XML.QName('http://www.w3.org/2000/09/xmldsig#', 'Transform'),
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformType')
            });
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'ReferenceList',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceList')
            }, context);
            this.e({
                elementName: 'DataReference',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceType'),
                scope: context.ti('org_w3__2001__04_xmlenc.ReferenceList')
            }, context);
            this.e({
                elementName: 'KeyReference',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.ReferenceType'),
                scope: context.ti('org_w3__2001__04_xmlenc.ReferenceList')
            }, context);
            this.e({
                elementName: 'EncryptionProperty',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionPropertyType')
            }, context);
            this.e({
                elementName: 'EncryptedKey',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptedKeyType')
            }, context);
            this.e({
                elementName: 'CipherData',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.CipherDataType')
            }, context);
            this.e({
                elementName: 'CipherReference',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.CipherReferenceType')
            }, context);
            this.e({
                elementName: 'EncryptedData',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptedDataType')
            }, context);
            this.e({
                elementName: 'EncryptionProperties',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.EncryptionPropertiesType')
            }, context);
            this.e({
                elementName: 'AgreementMethod',
                typeInfo: context.ti('org_w3__2001__04_xmlenc.AgreementMethodType')
            }, context);
            this.e({
                elementName: 'KeySize',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                scope: context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType')
            }, context);
            this.e({
                elementName: 'OAEPparams',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2001__04_xmlenc.EncryptionMethodType')
            }, context);
            this.e({
                elementName: 'OriginatorKeyInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType'),
                scope: context.ti('org_w3__2001__04_xmlenc.AgreementMethodType')
            }, context);
            this.e({
                elementName: 'RecipientKeyInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType'),
                scope: context.ti('org_w3__2001__04_xmlenc.AgreementMethodType')
            }, context);
            this.e({
                elementName: 'KA-Nonce',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2001__04_xmlenc.AgreementMethodType')
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.org_w3__2001__04_xmlenc = org_w3__2001__04_xmlenc;
}