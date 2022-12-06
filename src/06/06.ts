import { readFile } from '../fileHelper';

const content = readFile(6);

function findUniqueSequence(size: number) {
  for (let i = size; i < content.length; i++) {
    const element = content.slice(i - size, i);
    if (new Set(element).size === element.length) {
      console.log(element);
      console.log(i);
      break;
    }
  }
}

findUniqueSequence(4);
//part 2
findUniqueSequence(14);
