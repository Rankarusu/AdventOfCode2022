import { readFile } from '../fileHelper';

const content = readFile(6);

for (let i = 4; i < content.length; i++) {
  const element = content.slice(i - 4, i);
  if (new Set(element).size === element.length) {
    console.log(element);
    console.log(i);
    break;
  }
}
