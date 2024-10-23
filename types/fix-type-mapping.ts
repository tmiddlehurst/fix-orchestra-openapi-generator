import type { FixToOpenApiTypesMap } from './types';

export const rawFixFieldMapping = {
  Tag: 'tag',
  'Field Name': 'fieldName',
  'Abbr Name': 'abbrName',
  NotXML: 'notXml',
  'Data Type': 'dataType',
  'Union Datatype': 'unionDatatype',
  Description: 'description',
  Pedigree: 'pedigree',
};

// See Zalando API style guide
// https://github.com/zalando/restful-api-guidelines/blob/main/chapters/data-formats.adoc
export const fixTypeToOpenApiMap: FixToOpenApiTypesMap = {
  int: {
    fixType: 'int',
    openApiType: 'number',
    description:
      'Sequence of digits without commas or decimals and optional sign character (ASCII characters - and 0 - 9 ). The sign character utilizes one byte (i.e. positive int is 99999 while negative int is -99999). Note that int values may contain leading zeros (e.g. 00023 = 23).',
  },
  Length: {
    fixType: 'Length',
    openApiType: 'number',
    description:
      'int field representing the length in bytes. Value must be positive.',
  },
  TagNum: {
    fixType: 'TagNum',
    openApiType: 'number',
    description:
      "int field representing a field's tag number when using FIX Tag=Value syntax. Value must be positive and may not contain leading zeros.",
  },
  SeqNum: {
    fixType: 'SeqNum',
    openApiType: 'number',
    description:
      'int field representing a message sequence number. Value must be positive.',
  },
  NumInGroup: {
    fixType: 'NumInGroup',
    openApiType: 'number',
    description:
      'int field representing the number of entries in a repeating group. Value must be positive.',
  },
  DayOfMonth: {
    fixType: 'DayOfMonth',
    openApiType: 'number',
    description:
      'int field representing a day during a particular month (values 1 to 31).',
  },
  float: {
    fixType: 'float',
    openApiType: 'number',
    description:
      'Sequence of digits with optional decimal point and sign character (ASCII characters -, 0 - 9 and .); the absence of the decimal point within the string will be interpreted as the float representation of an integer value. All float fields must accommodate up to fifteen significant digits. The number of decimal places used should be a factor of business/market needs and mutual agreement between counterparties. Note that float values may contain leading zeros (e.g. 00023.23 = 23.23) and may contain or omit trailing zeros after the decimal point (e.g. 23.0 = 23.0000 = 23 = 23.). Note that fields which are derived from float may contain negative values unless explicitly specified otherwise.',
  },
  Qty: {
    fixType: 'Qty',
    openApiType: 'number',
    description:
      'float field capable of storing either a whole number (no decimal places) of shares (securities denominated in whole units) or a decimal value containing decimal places for non-share quantity asset classes (securities denominated in fractional units).',
  },
  Price: {
    fixType: 'Price',
    openApiType: 'number',
    description:
      'float field representing a price. Note the number of decimal places may vary. For certain asset classes prices may be negative values. For example, prices for options strategies can be negative under certain market conditions. Refer to Volume 7: FIX Usage by Product for asset classes that support negative price values.',
  },
  PriceOffset: {
    fixType: 'PriceOffset',
    openApiType: 'number',
    description:
      'float field representing a price offset, which can be mathematically added to a Price. Note the number of decimal places may vary and some fields such as LastForwardPoints may be negative.',
  },
  Amt: {
    fixType: 'Amt',
    openApiType: 'number',
    description: 'float field typically representing a Price times a Qty',
  },
  Percentage: {
    fixType: 'Percentage',
    openApiType: 'number',
    description:
      'float field representing a percentage (e.g. 0.05 represents 5% and 0.9525 represents 95.25%). Note the number of decimal places may vary.',
  },
  char: {
    fixType: 'char',
    openApiType: 'string',
    description:
      'Single character value, can include any alphanumeric character or punctuation except the delimiter. All char fields are case sensitive (i.e. m != M).',
    stringPattern: '[a-zA-Z]{1}',
  },
  Boolean: {
    fixType: 'Boolean',
    openApiType: 'boolean',
    description:
      "char field containing one of two values:\n'Y' = True/Yes\n'N' = False/No",
  },
  String: {
    fixType: 'String',
    openApiType: 'string',
    description:
      'Alpha-numeric free format strings, can include any character or punctuation except the delimiter. All String fields are case sensitive (i.e. morstatt != Morstatt).',
  },
  MultipleCharValue: {
    fixType: 'MultipleCharValue',
    openApiType: 'string',
    description:
      'string field containing one or more space delimited single character values (e.g. |18=2 A F| ).',
  },
  MultipleStringValue: {
    fixType: 'MultipleStringValue',
    openApiType: 'string',
    description:
      'string field containing one or more space delimited multiple character values (e.g. |277=AV AN A| ).',
  },
  Country: {
    fixType: 'Country',
    openApiType: 'string',
    description:
      'string field representing a country using ISO 3166 Country code (2 character) values (see Appendix 6-B).',
    stringPattern: '[a-zA-Z]{2}',
    stringFormat: 'iso-3166-alpha-2',
  },
  Currency: {
    fixType: 'Currency',
    openApiType: 'string',
    description:
      'string field representing a currency type using ISO 4217 Currency code (3 character) values (see Appendix 6-A).',
    stringPattern: '[a-zA-Z]{3}',
    stringFormat: 'iso-4217',
  },
  Exchange: {
    fixType: 'Exchange',
    openApiType: 'string',
    description:
      'string field representing a market or exchange using ISO 10383 Market Identifier Code (MIC) values (seeAppendix 6-C).',
  },
  MonthYear: {
    fixType: 'MonthYear',
    openApiType: 'string',
    description:
      'string field representing month of a year. An optional day of the month can be appended or an optional week code.\nValid formats:\nYYYYMM\nYYYYMMDD\nYYYYMMWW\nValid values:\nYYYY = 0000-9999; MM = 01-12; DD = 01-31; WW = w1, w2, w3, w4, w5.',
  },
  UTCTimestamp: {
    fixType: 'UTCTimestamp',
    openApiType: 'string',
    description:
      'string field representing time/date combination represented in UTC (Universal Time Coordinated, also known as GMT) in either YYYYMMDD-HH:MM:SS (whole seconds) or YYYYMMDD-HH:MM:SS.sss* format, colons, dash, and period required.\nValid values:\nYYYY = 0000-9999, MM = 01-12, DD = 01-31, HH = 00-23, MM = 00-59, SS = 00-60 (60 only if UTC leap second), sss* fractions of seconds.\nThe fractions of seconds may be empty when no fractions of seconds are conveyed (in such a case the period is not conveyed), it may include 3 digits to convey milliseconds, 6 digits to convey microseconds, 9 digits to convey nanoseconds, 12 digits to convey picoseconds; Other number of digits may be used with bilateral agreement.\nLeap Seconds: Note that UTC includes corrections for leap seconds, which are inserted to account for slowing of the rotation of the earth. Leap second insertion is declared by the International Earth Rotation Service (IERS) and has, since 1972, only occurred on the night of Dec. 31 or Jun 30. The IERS considers March 31 and September 30 as secondary dates for leap second insertion, but has never utilized these dates. During a leap second insertion, a UTCTimestamp field may read 19981231-23:59:59, 19981231-23:59:60, 19990101-00:00:00. (see http://tycho.usno.navy.mil/leapsec.html)',
    stringFormat: 'date-time',
  },
  UTCTimeOnly: {
    fixType: 'UTCTimeOnly',
    openApiType: 'string',
    description:
      'string field representing time-only represented in UTC (Universal Time Coordinated, also known as GMT) in either HH:MM:SS (whole seconds) or HH:MM:SS.sss* (milliseconds) format, colons, and period required. This special-purpose field is paired with UTCDateOnly to form a proper UTCTimestamp for bandwidth-sensitive messages.\nValid values:\nHH = 00-23, MM = 00-59, SS = 00-60 (60 only if UTC leap second), sss* fractions of seconds. The fractions of seconds may be empty when no fractions of seconds are conveyed (in such a case the period is not conveyed), it may include 3 digits to convey milliseconds, 6 digits to convey microseconds, 9 digits to convey nanoseconds, 12 digits to convey picoseconds; Other number of digits may be used with bilateral agreement.',
    stringFormat: 'time',
  },
  UTCDateOnly: {
    fixType: 'UTCDateOnly',
    openApiType: 'string',
    description:
      'string field representing Date represented in UTC (Universal Time Coordinated, also known as GMT) in YYYYMMDD format. This special-purpose field is paired with UTCTimeOnly to form a proper UTCTimestamp for bandwidth-sensitive messages.\nValid values:\nYYYY = 0000-9999, MM = 01-12, DD = 01-31.',
    stringFormat: 'date',
  },
  LocalMktDate: {
    fixType: 'LocalMktDate',
    openApiType: 'string',
    description:
      'string field representing a Date of Local Market (as opposed to UTC) in YYYYMMDD format. This is the normal date field used by the FIX Protocol.\nValid values:\nYYYY = 0000-9999, MM = 01-12, DD = 01-31',
    stringFormat: 'date',
  },
  TZTimeOnly: {
    fixType: 'TZTimeOnly',
    openApiType: 'string',
    description:
      'string field representing the time represented based on ISO 8601. This is the time with a UTC offset to allow identification of local time and timezone of that time.\nFormat is HH:MM[:SS][Z | [ + | - hh[:mm]]] where HH = 00-23 hours, MM = 00-59 minutes, SS = 00-59 seconds, hh = 01-12 offset hours, mm = 00-59 offset minutes.',
    stringFormat: 'time',
  },
  TZTimestamp: {
    fixType: 'TZTimestamp',
    openApiType: 'string',
    description:
      'string field representing a time/date combination representing local time with an offset to UTC to allow identification of local time and timezone offset of that time. The representation is based on ISO 8601.\nFormat is YYYYMMDD-HH:MM:SS.sss*[Z | [ + | - hh[:mm]]] where YYYY = 0000 to 9999, MM = 01-12, DD = 01-31 HH = 00-23 hours, MM = 00-59 minutes, SS = 00-59 seconds, hh = 01-12 offset hours, mm = 00-59 offset minutes, sss* fractions of seconds. The fractions of seconds may be empty when no fractions of seconds are conveyed (in such a case the period is not conveyed), it may include 3 digits to convey milliseconds, 6 digits to convey microseconds, 9 digits to convey nanoseconds, 12 digits to convey picoseconds; Other number of digits may be used with bilateral agreement',
    stringFormat: 'date-time',
  },
  data: {
    fixType: 'data',
    openApiType: 'string',
    description:
      'string field containing raw data with no format or content restrictions. Data fields are always immediately preceded by a length field. The length field should specify the number of bytes of the value of the data field (up to but not including the terminating SOH).\nCaution: the value of one of these fields may contain the delimiter (SOH) character. Note that the value specified for this field should be followed by the delimiter (SOH) character as all fields are terminated with an SOH.',
  },
  Pattern: {
    fixType: 'Pattern',
    openApiType: 'string',
    description:
      'Used to build on and provide some restrictions on what is allowed as valid values in fields that uses a base FIX data type and a pattern data type. The universe of allowable valid values for the field would then be the union of the base set of valid values and what is defined by the pattern data type. The pattern data type used by the field will retain its base FIX data type (e.g. String, int, char).',
  },
  Tenor: {
    fixType: 'Tenor',
    openApiType: 'string',
    description:
      'used to allow the expression of FX standard tenors in addition to the base valid enumerations defined for the field that uses this pattern data type. This pattern data type is defined as follows:\nDx = tenor expression for days, e.g. D5, where x is any integer > 0\nMx = tenor expression for months, e.g. M3, where x is any integer > 0\nWx = tenor expression for weeks, e.g. W13, where x is any integer > 0\nYx = tenor expression for years, e.g. Y1, where x is any integer > 0',
  },
  Reserved100Plus: {
    fixType: 'Reserved100Plus',
    openApiType: 'string',
    description:
      'Values 100 and above are reserved for bilaterally agreed upon user defined enumerations.',
  },
  Reserved1000Plus: {
    fixType: 'Reserved1000Plus',
    openApiType: 'string',
    description:
      'Values 1000 and above are reserved for bilaterally agreed upon user defined enumerations.',
  },
  Reserved4000Plus: {
    fixType: 'Reserved4000Plus',
    openApiType: 'string',
    description:
      'Values 4000 and above are reserved for bilaterally agreed upon user defined enumerations.',
  },
  XMLData: {
    fixType: 'XMLData',
    openApiType: 'string',
    description:
      'Contains an XML document raw data with no format or content restrictions. XMLData fields are always immediately preceded by a length field. The length field should specify the number of bytes of the value of the data field (up to but not including the terminating SOH).',
  },
  Language: {
    fixType: 'Language',
    openApiType: 'string',
    description: 'Identifier for a national language - uses ISO 639-1 standard',
    stringPattern: '[a-zA-Z]{2}',
    stringFormat: 'iso-639-1',
  },
  LocalMktTime: {
    fixType: 'LocalMktTime',
    openApiType: 'string',
    description:
      'string field representing the time local to a particular market center. Used where offset to UTC varies throughout the year and the defining market center is identified in a corresponding field.\nFormat is HH:MM:SS where HH = 00-23 hours, MM = 00-59 minutes, SS = 00-59 seconds. In general only the hour token is non-zero.',
    stringFormat: 'date',
  },
  XID: {
    fixType: 'XID',
    openApiType: 'string',
    description:
      'The purpose of the XID datatype is to define a unique identifier that is global to a FIX message. An identifier defined using this datatype uniquely identifies its containing element, whatever its type and name is. The constraint added by this datatype is that the values of all the fields that have an XID datatype in a FIX message must be unique.',
  },
  XIDREF: {
    fixType: 'XIDREF',
    openApiType: 'string',
    description:
      'The XIDREF datatype defines a reference to an identifier defined by the XID datatype.',
  },
};
