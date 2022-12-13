import { readFile } from '../fileHelper';

const content = readFile(13);
const pairs = content.split('\n\n').map((pair) => pair.split('\n'));

console.log(pairs);
