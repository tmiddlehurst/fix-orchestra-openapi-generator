import type { FixFieldAsOpenApiSchema } from './types/types';
import { getFixFieldDefinitionsFromFixOrchestraXml } from './tools/get-fix-field-defs';
import { writeOutput } from './tools/write-output';

let outputFile = './fix-fields.yml';

if (process.argv[2] && process.argv[2] === '-o') {
  outputFile = process.argv[3];
}

const fieldDefinitions: FixFieldAsOpenApiSchema[] = getFixFieldDefinitionsFromFixOrchestraXml();

writeOutput(fieldDefinitions, outputFile);

