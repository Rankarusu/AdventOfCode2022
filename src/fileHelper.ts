import * as fs from 'node:fs';
import path from 'node:path';

export function readFile(day: number) {
  const paddedString = day.toString().padStart(2, '0');
  const inputPath = path.resolve(
    __dirname,
    `./${paddedString}/${paddedString}.input.txt`
  );
  const content = fs.readFileSync(inputPath, {
    encoding: 'utf8',
    flag: 'r',
  });
  return content;
}
