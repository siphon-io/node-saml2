if (typeof Jsonix === 'undefined' && typeof require === 'function') {
    var Jsonix = require('jsonix-smart').Jsonix;
}
var oasis_names_tc_xacml__3_0_core_schema_wd_17 = new (Jsonix.Class(Jsonix.Model.Module, {
        name: 'oasis_names_tc_xacml__3_0_core_schema_wd_17',
        defaultElementNamespaceURI: 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
        registerTypeInfos: function (context) {
            this.c({ localName: 'ConditionType' }, context);
            this.c({ localName: 'StatusCodeType' }, context);
            this.c({ localName: 'AttributesType' }, context);
            this.c({ localName: 'IdReferenceType' }, context);
            this.c({ localName: 'RuleCombinerParametersType' }, context);
            this.c({ localName: 'AttributeAssignmentExpressionType' }, context);
            this.c({ localName: 'ObligationExpressionType' }, context);
            this.c({ localName: 'DefaultsType' }, context);
            this.c({ localName: 'AssociatedAdviceType' }, context);
            this.c({ localName: 'AdviceExpressionsType' }, context);
            this.c({ localName: 'AttributeType' }, context);
            this.c({ localName: 'ResultType' }, context);
            this.c({ localName: 'ObligationsType' }, context);
            this.c({ localName: 'AnyOfType' }, context);
            this.c({ localName: 'AttributeDesignatorType' }, context);
            this.c({ localName: 'ExpressionType' }, context);
            this.c({ localName: 'ObligationType' }, context);
            this.c({ localName: 'MultiRequestsType' }, context);
            this.c({ localName: 'PolicyType' }, context);
            this.c({ localName: 'StatusDetailType' }, context);
            this.c({ localName: 'VariableReferenceType' }, context);
            this.c({ localName: 'CombinerParameterType' }, context);
            this.c({ localName: 'PolicyIssuerType' }, context);
            this.c({ localName: 'PolicySetType' }, context);
            this.c({ localName: 'PolicyIdentifierListType' }, context);
            this.c({ localName: 'RequestType' }, context);
            this.c({ localName: 'MissingAttributeDetailType' }, context);
            this.c({ localName: 'RequestReferenceType' }, context);
            this.c({ localName: 'AttributeValueType' }, context);
            this.c({ localName: 'ObligationExpressionsType' }, context);
            this.c({ localName: 'PolicySetCombinerParametersType' }, context);
            this.c({ localName: 'TargetType' }, context);
            this.c({ localName: 'ApplyType' }, context);
            this.c({ localName: 'ContentType' }, context);
            this.c({ localName: 'CombinerParametersType' }, context);
            this.c({ localName: 'AttributeAssignmentType' }, context);
            this.c({ localName: 'AdviceExpressionType' }, context);
            this.c({ localName: 'VariableDefinitionType' }, context);
            this.c({ localName: 'FunctionType' }, context);
            this.c({ localName: 'MatchType' }, context);
            this.c({ localName: 'ResponseType' }, context);
            this.c({ localName: 'AdviceType' }, context);
            this.c({ localName: 'RuleType' }, context);
            this.c({ localName: 'PolicyCombinerParametersType' }, context);
            this.c({ localName: 'AttributeSelectorType' }, context);
            this.c({ localName: 'RequestDefaultsType' }, context);
            this.c({ localName: 'StatusType' }, context);
            this.c({ localName: 'AttributesReferenceType' }, context);
            this.c({ localName: 'AllOfType' }, context);
        },
        buildTypeInfos: function (context) {
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ConditionType').ps().er({
                name: 'expression',
                elementName: 'Expression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusCodeType').ps().e({
                name: 'statusCode',
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusCodeType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusCodeType').ps().a({
                name: 'value',
                attributeName: 'Value'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType').ps().e({
                name: 'content',
                elementName: 'Content',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ContentType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType').ps().e({
                name: 'attribute',
                collection: true,
                elementName: 'Attribute',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType').ps().a({
                name: 'id',
                typeInfo: Jsonix.Schema.XSD.ID.INSTANCE,
                attributeName: new Jsonix.XML.QName('http://www.w3.org/XML/1998/namespace', 'id')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType').ps().v({ name: 'value' });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType').ps().a({
                name: 'earliestVersion',
                attributeName: 'EarliestVersion'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType').ps().a({
                name: 'latestVersion',
                attributeName: 'LatestVersion'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleCombinerParametersType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleCombinerParametersType').ps().a({
                name: 'ruleIdRef',
                attributeName: 'RuleIdRef'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType').ps().er({
                name: 'expression',
                elementName: 'Expression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType').ps().a({
                name: 'attributeId',
                attributeName: 'AttributeId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType').ps().a({
                name: 'issuer',
                attributeName: 'Issuer'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionType').ps().e({
                name: 'attributeAssignmentExpression',
                collection: true,
                elementName: 'AttributeAssignmentExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionType').ps().a({
                name: 'obligationId',
                attributeName: 'ObligationId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionType').ps().a({
                name: 'fulfillOn',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'FulfillOn'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.DefaultsType').ps().e({
                name: 'xPathVersion',
                elementName: 'XPathVersion'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AssociatedAdviceType').ps().e({
                name: 'advice',
                collection: true,
                elementName: 'Advice',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionsType').ps().e({
                name: 'adviceExpression',
                collection: true,
                elementName: 'AdviceExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType').ps().e({
                name: 'attributeValue',
                collection: true,
                elementName: 'AttributeValue',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType').ps().a({
                name: 'attributeId',
                attributeName: 'AttributeId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType').ps().a({
                name: 'issuer',
                attributeName: 'Issuer'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType').ps().a({
                name: 'includeInResult',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'IncludeInResult'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'decision',
                elementName: 'Decision',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'status',
                elementName: 'Status',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'obligations',
                elementName: 'Obligations',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'associatedAdvice',
                elementName: 'AssociatedAdvice',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AssociatedAdviceType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'attributes',
                collection: true,
                elementName: 'Attributes',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType').ps().e({
                name: 'policyIdentifierList',
                elementName: 'PolicyIdentifierList',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIdentifierListType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationsType').ps().e({
                name: 'obligation',
                collection: true,
                elementName: 'Obligation',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AnyOfType').ps().e({
                name: 'allOf',
                collection: true,
                elementName: 'AllOf',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AllOfType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').ps().a({
                name: 'attributeId',
                attributeName: 'AttributeId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').ps().a({
                name: 'dataType',
                attributeName: 'DataType'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').ps().a({
                name: 'issuer',
                attributeName: 'Issuer'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType').ps().a({
                name: 'mustBePresent',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'MustBePresent'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationType').ps().e({
                name: 'attributeAssignment',
                collection: true,
                elementName: 'AttributeAssignment',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationType').ps().a({
                name: 'obligationId',
                attributeName: 'ObligationId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MultiRequestsType').ps().e({
                name: 'requestReference',
                collection: true,
                elementName: 'RequestReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestReferenceType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'description',
                elementName: 'Description'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'policyIssuer',
                elementName: 'PolicyIssuer',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIssuerType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'policyDefaults',
                elementName: 'PolicyDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.DefaultsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'target',
                elementName: 'Target',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.TargetType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().es({
                name: 'combinerParametersOrRuleCombinerParametersOrVariableDefinition',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'CombinerParameters',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType')
                    },
                    {
                        elementName: 'VariableDefinition',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableDefinitionType')
                    },
                    {
                        elementName: 'Rule',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType')
                    },
                    {
                        elementName: 'RuleCombinerParameters',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleCombinerParametersType')
                    }
                ]
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'obligationExpressions',
                elementName: 'ObligationExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().e({
                name: 'adviceExpressions',
                elementName: 'AdviceExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().a({
                name: 'policyId',
                attributeName: 'PolicyId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().a({
                name: 'ruleCombiningAlgId',
                attributeName: 'RuleCombiningAlgId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType').ps().a({
                name: 'maxDelegationDepth',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                attributeName: 'MaxDelegationDepth'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusDetailType').ps().ae({
                name: 'any',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableReferenceType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableReferenceType').ps().a({
                name: 'variableId',
                attributeName: 'VariableId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParameterType').ps().e({
                name: 'attributeValue',
                elementName: 'AttributeValue',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParameterType').ps().a({
                name: 'parameterName',
                attributeName: 'ParameterName'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIssuerType').ps().e({
                name: 'content',
                elementName: 'Content',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ContentType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIssuerType').ps().e({
                name: 'attribute',
                collection: true,
                elementName: 'Attribute',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'description',
                elementName: 'Description'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'policyIssuer',
                elementName: 'PolicyIssuer',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIssuerType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'policySetDefaults',
                elementName: 'PolicySetDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.DefaultsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'target',
                elementName: 'Target',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.TargetType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().ers({
                name: 'policySetOrPolicyOrPolicySetIdReference',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'PolicyCombinerParameters',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyCombinerParametersType')
                    },
                    {
                        elementName: 'PolicySetCombinerParameters',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetCombinerParametersType')
                    },
                    {
                        elementName: 'PolicyIdReference',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
                    },
                    {
                        elementName: 'PolicySet',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType')
                    },
                    {
                        elementName: 'PolicySetIdReference',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
                    },
                    {
                        elementName: 'Policy',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType')
                    },
                    {
                        elementName: 'CombinerParameters',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType')
                    }
                ]
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'obligationExpressions',
                elementName: 'ObligationExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().e({
                name: 'adviceExpressions',
                elementName: 'AdviceExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().a({
                name: 'policySetId',
                attributeName: 'PolicySetId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().a({
                name: 'version',
                attributeName: 'Version'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().a({
                name: 'policyCombiningAlgId',
                attributeName: 'PolicyCombiningAlgId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType').ps().a({
                name: 'maxDelegationDepth',
                typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
                attributeName: 'MaxDelegationDepth'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIdentifierListType').ps().ers({
                name: 'policyIdReferenceOrPolicySetIdReference',
                collection: true,
                elementTypeInfos: [
                    {
                        elementName: 'PolicyIdReference',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
                    },
                    {
                        elementName: 'PolicySetIdReference',
                        typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
                    }
                ]
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType').ps().e({
                name: 'requestDefaults',
                elementName: 'RequestDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestDefaultsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType').ps().e({
                name: 'attributes',
                collection: true,
                elementName: 'Attributes',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType').ps().e({
                name: 'multiRequests',
                elementName: 'MultiRequests',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MultiRequestsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType').ps().a({
                name: 'returnPolicyIdList',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'ReturnPolicyIdList'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType').ps().a({
                name: 'combinedDecision',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'CombinedDecision'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType').ps().e({
                name: 'attributeValue',
                collection: true,
                elementName: 'AttributeValue',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType').ps().a({
                name: 'attributeId',
                attributeName: 'AttributeId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType').ps().a({
                name: 'dataType',
                attributeName: 'DataType'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType').ps().a({
                name: 'issuer',
                attributeName: 'Issuer'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestReferenceType').ps().e({
                name: 'attributesReference',
                collection: true,
                elementName: 'AttributesReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesReferenceType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType').ps().a({
                name: 'dataType',
                attributeName: 'DataType'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionsType').ps().e({
                name: 'obligationExpression',
                collection: true,
                elementName: 'ObligationExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetCombinerParametersType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetCombinerParametersType').ps().a({
                name: 'policySetIdRef',
                attributeName: 'PolicySetIdRef'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.TargetType').ps().e({
                name: 'anyOf',
                collection: true,
                elementName: 'AnyOf',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AnyOfType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ApplyType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ApplyType').ps().e({
                name: 'description',
                elementName: 'Description'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ApplyType').ps().er({
                name: 'expression',
                collection: true,
                elementName: 'Expression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ApplyType').ps().a({
                name: 'functionId',
                attributeName: 'FunctionId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ContentType').ps().ae({
                name: 'content',
                collection: true,
                domAllowed: true,
                typedObjectAllowed: true,
                mixed: true
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType').ps().e({
                name: 'combinerParameter',
                collection: true,
                elementName: 'CombinerParameter',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParameterType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType').ps().aa({ name: 'otherAttributes' });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType').ps().a({
                name: 'attributeId',
                attributeName: 'AttributeId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType').ps().a({
                name: 'issuer',
                attributeName: 'Issuer'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionType').ps().e({
                name: 'attributeAssignmentExpression',
                collection: true,
                elementName: 'AttributeAssignmentExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionType').ps().a({
                name: 'adviceId',
                attributeName: 'AdviceId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionType').ps().a({
                name: 'appliesTo',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'AppliesTo'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableDefinitionType').ps().er({
                name: 'expression',
                elementName: 'Expression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableDefinitionType').ps().a({
                name: 'variableId',
                attributeName: 'VariableId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.FunctionType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.FunctionType').ps().a({
                name: 'functionId',
                attributeName: 'FunctionId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType').ps().e({
                name: 'attributeValue',
                elementName: 'AttributeValue',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType').ps().e({
                name: 'attributeDesignator',
                elementName: 'AttributeDesignator',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType').ps().e({
                name: 'attributeSelector',
                elementName: 'AttributeSelector',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType').ps().a({
                name: 'matchId',
                attributeName: 'MatchId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResponseType').ps().e({
                name: 'result',
                collection: true,
                elementName: 'Result',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceType').ps().e({
                name: 'attributeAssignment',
                collection: true,
                elementName: 'AttributeAssignment',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceType').ps().a({
                name: 'adviceId',
                attributeName: 'AdviceId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().e({
                name: 'description',
                elementName: 'Description'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().e({
                name: 'target',
                elementName: 'Target',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.TargetType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().e({
                name: 'condition',
                elementName: 'Condition',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ConditionType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().e({
                name: 'obligationExpressions',
                elementName: 'ObligationExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().e({
                name: 'adviceExpressions',
                elementName: 'AdviceExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionsType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().a({
                name: 'ruleId',
                attributeName: 'RuleId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType').ps().a({
                name: 'effect',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
                attributeName: 'Effect'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyCombinerParametersType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyCombinerParametersType').ps().a({
                name: 'policyIdRef',
                attributeName: 'PolicyIdRef'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').b(context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType'));
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').ps().a({
                name: 'category',
                attributeName: 'Category'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').ps().a({
                name: 'contextSelectorId',
                attributeName: 'ContextSelectorId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').ps().a({
                name: 'path',
                attributeName: 'Path'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').ps().a({
                name: 'dataType',
                attributeName: 'DataType'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType').ps().a({
                name: 'mustBePresent',
                typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
                attributeName: 'MustBePresent'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestDefaultsType').ps().e({
                name: 'xPathVersion',
                elementName: 'XPathVersion'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusType').ps().e({
                name: 'statusCode',
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusCodeType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusType').ps().e({
                name: 'statusMessage',
                elementName: 'StatusMessage'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusType').ps().e({
                name: 'statusDetail',
                elementName: 'StatusDetail',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusDetailType')
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesReferenceType').ps().a({
                name: 'referenceId',
                typeInfo: Jsonix.Schema.XSD.IDREF.INSTANCE,
                attributeName: 'ReferenceId'
            });
            context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AllOfType').ps().e({
                name: 'match',
                collection: true,
                elementName: 'Match',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType')
            });
        },
        registerElementInfos: function (context) {
            this.e({
                elementName: 'PolicySetIdReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
            }, context);
            this.e({
                elementName: 'PolicyIdReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.IdReferenceType')
            }, context);
            this.e({
                elementName: 'Attributes',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesType')
            }, context);
            this.e({
                elementName: 'Condition',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ConditionType')
            }, context);
            this.e({
                elementName: 'StatusCode',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusCodeType')
            }, context);
            this.e({
                elementName: 'AttributeAssignmentExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentExpressionType')
            }, context);
            this.e({
                elementName: 'RuleCombinerParameters',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleCombinerParametersType')
            }, context);
            this.e({
                elementName: 'AssociatedAdvice',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AssociatedAdviceType')
            }, context);
            this.e({
                elementName: 'Decision',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'ObligationExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionType')
            }, context);
            this.e({
                elementName: 'PolicySetDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.DefaultsType')
            }, context);
            this.e({
                elementName: 'Attribute',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeType')
            }, context);
            this.e({
                elementName: 'AdviceExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionsType')
            }, context);
            this.e({
                elementName: 'AttributeDesignator',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeDesignatorType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'AnyOf',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AnyOfType')
            }, context);
            this.e({
                elementName: 'Obligations',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationsType')
            }, context);
            this.e({
                elementName: 'Result',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResultType')
            }, context);
            this.e({
                elementName: 'MultiRequests',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MultiRequestsType')
            }, context);
            this.e({
                elementName: 'Obligation',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationType')
            }, context);
            this.e({
                elementName: 'Policy',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyType')
            }, context);
            this.e({
                elementName: 'StatusDetail',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusDetailType')
            }, context);
            this.e({
                elementName: 'StatusMessage',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'PolicySet',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetType')
            }, context);
            this.e({
                elementName: 'PolicyIssuer',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIssuerType')
            }, context);
            this.e({
                elementName: 'VariableReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableReferenceType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'CombinerParameter',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParameterType')
            }, context);
            this.e({
                elementName: 'AttributeValue',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeValueType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'ObligationExpressions',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ObligationExpressionsType')
            }, context);
            this.e({
                elementName: 'PolicySetCombinerParameters',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicySetCombinerParametersType')
            }, context);
            this.e({
                elementName: 'Request',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestType')
            }, context);
            this.e({
                elementName: 'MissingAttributeDetail',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MissingAttributeDetailType')
            }, context);
            this.e({
                elementName: 'RequestReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestReferenceType')
            }, context);
            this.e({
                elementName: 'PolicyDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.DefaultsType')
            }, context);
            this.e({
                elementName: 'PolicyIdentifierList',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyIdentifierListType')
            }, context);
            this.e({
                elementName: 'XPathVersion',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'Target',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.TargetType')
            }, context);
            this.e({
                elementName: 'AttributeAssignment',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeAssignmentType')
            }, context);
            this.e({
                elementName: 'Content',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ContentType')
            }, context);
            this.e({
                elementName: 'CombinerParameters',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.CombinerParametersType')
            }, context);
            this.e({
                elementName: 'Expression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ExpressionType')
            }, context);
            this.e({
                elementName: 'Apply',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ApplyType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'VariableDefinition',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.VariableDefinitionType')
            }, context);
            this.e({
                elementName: 'Function',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.FunctionType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'Match',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.MatchType')
            }, context);
            this.e({
                elementName: 'Description',
                typeInfo: Jsonix.Schema.XSD.String.INSTANCE
            }, context);
            this.e({
                elementName: 'AdviceExpression',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceExpressionType')
            }, context);
            this.e({
                elementName: 'RequestDefaults',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RequestDefaultsType')
            }, context);
            this.e({
                elementName: 'AttributeSelector',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributeSelectorType'),
                substitutionHead: 'Expression'
            }, context);
            this.e({
                elementName: 'PolicyCombinerParameters',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.PolicyCombinerParametersType')
            }, context);
            this.e({
                elementName: 'Rule',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.RuleType')
            }, context);
            this.e({
                elementName: 'Advice',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AdviceType')
            }, context);
            this.e({
                elementName: 'Response',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.ResponseType')
            }, context);
            this.e({
                elementName: 'Status',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.StatusType')
            }, context);
            this.e({
                elementName: 'AllOf',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AllOfType')
            }, context);
            this.e({
                elementName: 'AttributesReference',
                typeInfo: context.ti('oasis_names_tc_xacml__3_0_core_schema_wd_17.AttributesReferenceType')
            }, context);
        }
    }))();
if (typeof require === 'function') {
    module.exports.oasis_names_tc_xacml__3_0_core_schema_wd_17 = oasis_names_tc_xacml__3_0_core_schema_wd_17;
}