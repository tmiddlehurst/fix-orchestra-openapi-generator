import type { FixFieldAsOpenApiSchema, OpenApiType } from '../types/types';
import fs from 'fs';

export function writeOutput(fieldDefinitions: FixFieldAsOpenApiSchema[], outputFile: string) {
  const output: string = fieldDefinitions.reduce((yamlString, fieldDefinition: FixFieldAsOpenApiSchema) => {
    return yamlString + getYamlForField(fieldDefinition);
  }, '');

  fs.writeFileSync(outputFile, output);
}


const getYamlForField = ({ fieldName, type, description, tag, _enum }: FixFieldAsOpenApiSchema) => {
  return `${fieldName}:${getType(type.openApiType)}${getEnum(_enum)}${getDescription(description)}${getExternalDocs(tag)}${getPattern(type)}${getFormat(type)}\n`;
};

const getType = (type: string) => `\n  type: ${type}`;
const getDescription = (description: string) => `\n  description: "${description}"`;
const getExternalDocs = (tag: string) => `\n  externalDocs:\n    description: FIX-${tag}\n    url: https://fiximate.fixtrading.org/en/FIX.Latest/tag${tag}.html`;
const getPattern = (typeInfo: OpenApiType) => typeInfo && typeInfo.stringPattern ? `\n  pattern: "${typeInfo.stringPattern}"` : '';
const getFormat = (typeInfo: OpenApiType) => typeInfo && typeInfo.stringFormat ? `\n  format: ${typeInfo.stringFormat}` : '';
const getEnum = (_enum: string[] | undefined) => _enum && _enum.length ? `\n  enum:${_enum.reduce(reduceEnumToString, '')}` : '';
const reduceEnumToString = (str: string, val: string) => `${str}\n    - ${val}`;
