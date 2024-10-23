export type FieldsMap = { [key: number]: string; };

export type FixType =
  | 'int'
  | 'Length'
  | 'float'
  | 'char'
  | 'String'
  | 'Pattern'
  | 'Price'
  | 'SeqNum'
  | 'Amt'
  | 'Qty'
  | 'Currency'
  | 'MultipleCharValue'
  | 'Exchange'
  | 'NumInGroup'
  | 'UTCTimestamp'
  | 'Boolean'
  | 'LocalMktDate'
  | 'int'
  | 'data'
  | 'float'
  | 'Percentage'
  | 'PriceOffset'
  | 'MonthYear'
  | 'XMLData'
  | 'UTCDateOnly'
  | 'UTCTimeOnly'
  | 'MultipleStringValue'
  | 'Country'
  | 'TZTimeOnly'
  | 'DayOfMonth'
  | 'TZTimestamp'
  | 'Tenor'
  | 'Reserved100Plus'
  | 'Reserved1000Plus'
  | 'Reserved4000Plus'
  | 'Language'
  | 'TagNum'
  | 'LocalMktTime'
  | 'XIDREF'
  | 'XID';
export type FixBaseType = 'int' | 'float' | 'char' | 'String' | 'Pattern';
export type RawFixField = {
  Tag: string;
  'Field Name': string;
  'Abbr Name': string;
  NotXML: 'Y' | 'N';
  'Data Type': FixType;
  'Union Datatype': string;
  Description: string;
  Pedigree: string;
};

export type FixToOpenApiTypesMap = {
  [key in FixType]: OpenApiType;
};

export type OpenApiPrimitiveType = 'string' | 'number' | 'boolean';
export type OpenApiType = {
  fixType: FixType;
  openApiType: OpenApiPrimitiveType;
  description: string;
  stringPattern?: string;
  stringFormat?: string;
};
export type FixFieldAsOpenApiSchema = {
  tag: string;
  description: string;
  fieldName: string;
  type: OpenApiType;
  _enum?: string[];
};

export type FixOrchestra = {
  'fixr:repository': {
    $: [];
    'fixr:metadata': [];
    'fixr:codeSets': FixCodeSets[];
    'fixr:datatypes': [];
    'fixr:categories': [];
    'fixr:sections': [];
    'fixr:fields': FixFields[];
    'fixr:components': [];
    'fixr:groups': [];
    'fixr:messages': [];
  };
};

type FixFields = {
  'fixr:field': FixOrchestraFieldDef[];
};

type FixCodeSets = {
  'fixr:codeSet': FixOrchestraCodeSetDef[];
};

export type FixOrchestraFieldDef = {
  $: {
    added: string;
    id: string;
    name: string;
    type: FixType;
    abbrName: string;
  };
  'fixr:annotation': FixAnnotation[];
};

type FixAnnotation = {
  'fixr:documentation': FixDocumentation[];
};

type FixDocumentation = {
  _: Description;
  $: {
    purpose: string;
  };
};

type Description = string;

type CodeSetMeta = {
  name: string;
  id: string;
  type: string;
  added: string;
};

type Code = {
  name: string;
  id: string;
  type: FixType;
  sort: string;
  added: string;
};

type FixOrchestraCodeSetDef = {
  $: CodeSetMeta;
  'fixr:code': [
    {
      $: Code;
      'fixr:annotation': FixDocumentation[];
    }
  ];
  'fixr:annotation': FixDocumentation[];
};
