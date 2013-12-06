if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var org_w3__2000__09_xmldsig = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'org_w3__2000__09_xmldsig',
        defaultElementNamespaceURI: 'http://www.w3.org/2000/09/xmldsig#',
        registerTypeInfos: function (context) {
            this.c({ localName: 'KeyInfoType' }, context);
            this.c({ localName: 'SignedInfoType' }, context);
            this.c({ localName: 'RetrievalMethodType' }, context);
            this.c({ localName: 'DigestMethodType' }, context);
            this.c({ localName: 'SignatureMethodType' }, context);
            this.c({ localName: 'SPKIDataType' }, context);
            this.c({ localName: 'X509DataType' }, context);
            this.c({ localName: 'PGPDataType' }, context);
            this.c({ localName: 'SignatureType' }, context);
            this.c({ localName: 'DSAKeyValueType' }, context);
            this.c({ localName: 'ManifestType' }, context);
            this.c({ localName: 'SignatureValueType' }, context);
            this.c({ localName: 'TransformsType' }, context);
            this.c({ localName: 'RSAKeyValueType' }, context);
            this.c({ localName: 'TransformType' }, context);
            this.c({ localName: 'SignaturePropertyType' }, context);
            this.c({ localName: 'KeyValueType' }, context);
            this.c({ localName: 'ReferenceType' }, context);
            this.c({ localName: 'CanonicalizationMethodType' }, context);
            this.c({ localName: 'SignaturePropertiesType' }, context);
            this.c({ localName: 'ObjectType' }, context);
            this.c({ localName: 'X509IssuerSerialType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('org_w3__2000__09_xmldsig.KeyInfoType').ps().ers({
                name: 'content',
                collection: true,
                mixed: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'KeyValue',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyValueType')
                    },
                    {
                        elementName: 'X509Data',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.X509DataType')
                    },
                    { elementName: 'KeyName' },
                    {
                        elementName: 'RetrievalMethod',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.RetrievalMethodType')
                    },
                    { elementName: 'MgmtData' },
                    {
                        elementName: 'PGPData',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.PGPDataType')
                    },
                    {
                        elementName: 'SPKIData',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.SPKIDataType')
                    }
                ]
            });
            context.ti('org_w3__2000__09_xmldsig.KeyInfoType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.SignedInfoType').ps().e({
                name: 'canonicalizationMethod',
                elementName: 'CanonicalizationMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.CanonicalizationMethodType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignedInfoType').ps().e({
                name: 'signatureMethod',
                elementName: 'SignatureMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureMethodType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignedInfoType').ps().e({
                name: 'reference',
                collection: true,
                elementName: 'Reference',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ReferenceType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignedInfoType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.RetrievalMethodType').ps().e({
                name: 'transforms',
                elementName: 'Transforms',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformsType')
            });
            context.ti('org_w3__2000__09_xmldsig.RetrievalMethodType').ps().a({
                name: 'uri',
                attributeName: 'URI'
            });
            context.ti('org_w3__2000__09_xmldsig.RetrievalMethodType').ps().a({
                name: 'type',
                attributeName: 'Type'
            });
            context.ti('org_w3__2000__09_xmldsig.DigestMethodType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('org_w3__2000__09_xmldsig.DigestMethodType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureMethodType').ps().er({
                name: 'content',
                collection: true,
                mixed: true,
                typedObjectAllowed: true,
                elementName: 'HMACOutputLength',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureMethodType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2000__09_xmldsig.SPKIDataType').ps().er({
                name: 'spkiSexpAndAny',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementName: 'SPKISexp',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.X509DataType').ps().ers({
                name: 'x509IssuerSerialOrX509SKIOrX509SubjectName',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'X509SKI',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    },
                    {
                        elementName: 'X509IssuerSerial',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.X509IssuerSerialType')
                    },
                    {
                        elementName: 'X509Certificate',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    },
                    {
                        elementName: 'X509CRL',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    },
                    { elementName: 'X509SubjectName' }
                ]
            });
            context.ti('org_w3__2000__09_xmldsig.PGPDataType').ps().ers({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'PGPKeyPacket',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    },
                    {
                        elementName: 'PGPKeyID',
                        typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
                    }
                ]
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureType').ps().e({
                name: 'signedInfo',
                elementName: 'SignedInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignedInfoType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureType').ps().e({
                name: 'signatureValue',
                elementName: 'SignatureValue',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureValueType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureType').ps().e({
                name: 'keyInfo',
                elementName: 'KeyInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureType').ps().e({
                name: 'object',
                collection: true,
                elementName: 'Object',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ObjectType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'p',
                elementName: 'P',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'q',
                elementName: 'Q',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'g',
                elementName: 'G',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'y',
                elementName: 'Y',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'j',
                elementName: 'J',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'seed',
                elementName: 'Seed',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType').ps().e({
                name: 'pgenCounter',
                elementName: 'PgenCounter',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.ManifestType').ps().e({
                name: 'reference',
                collection: true,
                elementName: 'Reference',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ReferenceType')
            });
            context.ti('org_w3__2000__09_xmldsig.ManifestType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureValueType').ps().v({
                name: 'value',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.SignatureValueType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.TransformsType').ps().e({
                name: 'transform',
                collection: true,
                elementName: 'Transform',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformType')
            });
            context.ti('org_w3__2000__09_xmldsig.RSAKeyValueType').ps().e({
                name: 'modulus',
                elementName: 'Modulus',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.RSAKeyValueType').ps().e({
                name: 'exponent',
                elementName: 'Exponent',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.TransformType').ps().er({
                name: 'content',
                collection: true,
                mixed: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementName: 'XPath'
            });
            context.ti('org_w3__2000__09_xmldsig.TransformType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2000__09_xmldsig.SignaturePropertyType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('org_w3__2000__09_xmldsig.SignaturePropertyType').ps().a({
                name: 'target',
                attributeName: 'Target'
            });
            context.ti('org_w3__2000__09_xmldsig.SignaturePropertyType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.KeyValueType').ps().ers({
                name: 'content',
                collection: true,
                mixed: true,
                domAllowed: true,
                typedObjectAllowed: true,
                elementTypeInfos: [
                    {
                        elementName: 'RSAKeyValue',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.RSAKeyValueType')
                    },
                    {
                        elementName: 'DSAKeyValue',
                        typeInfo: context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType')
                    }
                ]
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().e({
                name: 'transforms',
                elementName: 'Transforms',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformsType')
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().e({
                name: 'digestMethod',
                elementName: 'DigestMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.DigestMethodType')
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().e({
                name: 'digestValue',
                elementName: 'DigestValue',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().a({
                name: 'uri',
                attributeName: 'URI'
            });
            context.ti('org_w3__2000__09_xmldsig.ReferenceType').ps().a({
                name: 'type',
                attributeName: 'Type'
            });
            context.ti('org_w3__2000__09_xmldsig.CanonicalizationMethodType').ps().ae({
                name: 'content',
                collection: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('org_w3__2000__09_xmldsig.CanonicalizationMethodType').ps().a({
                name: 'algorithm',
                attributeName: 'Algorithm'
            });
            context.ti('org_w3__2000__09_xmldsig.SignaturePropertiesType').ps().e({
                name: 'signatureProperty',
                collection: true,
                elementName: 'SignatureProperty',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignaturePropertyType')
            });
            context.ti('org_w3__2000__09_xmldsig.SignaturePropertiesType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.ObjectType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('org_w3__2000__09_xmldsig.ObjectType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: 'Id'
            });
            context.ti('org_w3__2000__09_xmldsig.ObjectType').ps().a({
                name: 'mimeType',
                attributeName: 'MimeType'
            });
            context.ti('org_w3__2000__09_xmldsig.ObjectType').ps().a({
                name: 'encoding',
                attributeName: 'Encoding'
            });
            context.ti('org_w3__2000__09_xmldsig.X509IssuerSerialType').ps().e({
                name: 'x509IssuerName',
                elementName: 'X509IssuerName'
            });
            context.ti('org_w3__2000__09_xmldsig.X509IssuerSerialType').ps().e({
                name: 'x509SerialNumber',
                elementName: 'X509SerialNumber',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE
            });
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'PGPData',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.PGPDataType')
            }, context);
            this.e({
                elementName: 'SPKIData',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SPKIDataType')
            }, context);
            this.e({
                elementName: 'CanonicalizationMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.CanonicalizationMethodType')
            }, context);
            this.e({
                elementName: 'Transforms',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformsType')
            }, context);
            this.e({
                elementName: 'Manifest',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ManifestType')
            }, context);
            this.e({
                elementName: 'SignatureMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureMethodType')
            }, context);
            this.e({
                elementName: 'KeyInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyInfoType')
            }, context);
            this.e({
                elementName: 'DigestMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.DigestMethodType')
            }, context);
            this.e({
                elementName: 'MgmtData',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'SignedInfo',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignedInfoType')
            }, context);
            this.e({
                elementName: 'Object',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ObjectType')
            }, context);
            this.e({
                elementName: 'X509Data',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'SignatureProperties',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignaturePropertiesType')
            }, context);
            this.e({
                elementName: 'KeyName',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'RetrievalMethod',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.RetrievalMethodType')
            }, context);
            this.e({
                elementName: 'SignatureProperty',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignaturePropertyType')
            }, context);
            this.e({
                elementName: 'Reference',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.ReferenceType')
            }, context);
            this.e({
                elementName: 'RSAKeyValue',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.RSAKeyValueType')
            }, context);
            this.e({
                elementName: 'Signature',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureType')
            }, context);
            this.e({
                elementName: 'DSAKeyValue',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.DSAKeyValueType')
            }, context);
            this.e({
                elementName: 'SignatureValue',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.SignatureValueType')
            }, context);
            this.e({
                elementName: 'Transform',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.TransformType')
            }, context);
            this.e({
                elementName: 'DigestValue',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE
            }, context);
            this.e({
                elementName: 'KeyValue',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.KeyValueType')
            }, context);
            this.e({
                elementName: 'X509IssuerSerial',
                typeInfo: context.ti('org_w3__2000__09_xmldsig.X509IssuerSerialType'),
                scope: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'X509Certificate',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'X509SKI',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'X509SubjectName',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'X509CRL',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.X509DataType')
            }, context);
            this.e({
                elementName: 'HMACOutputLength',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.SignatureMethodType')
            }, context);
            this.e({
                elementName: 'PGPKeyID',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.PGPDataType')
            }, context);
            this.e({
                elementName: 'PGPKeyPacket',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.PGPDataType')
            }, context);
            this.e({
                elementName: 'SPKISexp',
                typeInfo: Jsonix.Schema.XSD.Base64Binary.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.SPKIDataType')
            }, context);
            this.e({
                elementName: 'XPath',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                scope: context.ti('org_w3__2000__09_xmldsig.TransformType')
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.org_w3__2000__09_xmldsig = org_w3__2000__09_xmldsig;
}