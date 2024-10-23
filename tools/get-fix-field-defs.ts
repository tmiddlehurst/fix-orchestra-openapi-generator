import type { FixFieldAsOpenApiSchema, FixOrchestraFieldDef, FixOrchestra, OpenApiType } from '../types/types';
import { Parser } from 'xml2js';
import fs from 'fs';
import { fixTypeToOpenApiMap } from '../types/fix-type-mapping';

const parser = new Parser();

export function getFixFieldDefinitionsFromFixOrchestraXml(): FixFieldAsOpenApiSchema[] {
  const data = fs.readFileSync('OrchestraFIXLatest.xml', 'utf8');
  let parsedFixOrchestra: FixOrchestra;

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }
    parsedFixOrchestra = result;
  });

  setTimeout(() => console.log(`expecting property definitions for ${parsedFixOrchestra['fixr:repository']['fixr:fields'][0]['fixr:field'].length}`), 0);

  return parsedFixOrchestra["fixr:repository"]["fixr:fields"][0]["fixr:field"]
    .map((def: FixOrchestraFieldDef) => {
      const isEnum = !fixTypeToOpenApiMap.hasOwnProperty(def.$.type);
      const defForOpenApi: FixFieldAsOpenApiSchema = {
        tag: def.$.id,
        fieldName: def.$.name,
        description: getDescription(def),
        type: {} as OpenApiType,
      };

      if (!isEnum) {
        defForOpenApi.type = fixTypeToOpenApiMap[def.$.type];
      } else {
        const codeSet = parsedFixOrchestra['fixr:repository']['fixr:codeSets'][0]['fixr:codeSet']
          .find((cs) => {
            return cs.$.name == def.$.type;
          });

        try {
          // @ts-expect-error
          const _enum = codeSet['fixr:code'].map((c) => {
            return c.$.name;
          }) as string[];

          defForOpenApi._enum = _enum;
        } catch (e) {
          throw new Error(`Error getting enum for ${def.$.name}\n${e}`);
        }

        try {
          // @ts-expect-error error will be caught
          defForOpenApi.type = fixTypeToOpenApiMap[codeSet?.$.type];
        } catch (e) {
          throw new Error(`Error looking up codeset on FieldName: ${def.$.name}\n FieldId: ${def.$.id}\n Codeset: ${JSON.stringify(codeSet)}\n${e}`);
        }
      }

      return defForOpenApi;
    });
}

const getDescription = (def: FixOrchestraFieldDef) => {
  let description = '';
  try {
    description = def['fixr:annotation'][0]['fixr:documentation'][0]._.trim().replace(/\n/g, '\\n').replace(/"/g, '\\\"'); // this still leaves large groups of ' ' after \n characters, should i remove?
  } catch (e) {
    console.error(`No description found for ${def.$.name}`);
  }
  return description;
};