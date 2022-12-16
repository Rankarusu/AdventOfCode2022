import { readFile } from '../fileHelper';

const content = readFile(13);
const pairs: Array<Array<Array<number | Array<number>>>> = content
  .split('\n\n')
  .map((pair: string) => pair.split('\n'))
  .map((arr) => arr.map((arrb) => JSON.parse(arrb)));

let inputsInRightOrder: number[] = [];

pairs.forEach((pair, index) => {
  const [left, right] = pair;

  let aLen = 0;
  let bLen = 0;
  if (Array.isArray(left)) {
    aLen = left.length;
  }

  if (Array.isArray(right)) {
    bLen = right.length;
  }

  const maxlen = Math.max(aLen, bLen);

  if (maxlen < 1) {
    inputsInRightOrder.push(index + 1);
  }

  for (let i = 0; i < maxlen; i++) {
    const a = left[i];
    const b = right[i];
    const ordered = compare(a, b);

    if (ordered > 0) {
      inputsInRightOrder.push(index + 1);
    }

    if (ordered !== 0) {
      break;
    }

    if (i === maxlen - 1) {
      inputsInRightOrder.push(index + 1);
    }
  }
});

const result = inputsInRightOrder.reduce((a, b) => a + b);
console.log(result);

function compare(
  a: number | Array<number | Array<number>>,
  b: number | Array<number | Array<number>>
): number {
  if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
  } else if (Array.isArray(a) && typeof b === 'number') {
    return compare(a, [b]);
  } else if (typeof a === 'number' && Array.isArray(b)) {
    return compare([a], b);
  } else {
    if (a === undefined) {
      return 1;
    } else if (b === undefined) {
      return -1;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const leftEl = a[i];
        const rightEl = b[i];
        const result = compare(leftEl, rightEl);
        if (result !== 0) {
          return result;
        }
      }

      if (a.length < b.length) {
        return 1;
      }
      if (a.length > b.length) {
        return -1;
      }
    }
  }
  return 0;
}

//part 2

const dividerPackets = [[[2]], [[6]]];
const packets = pairs.flat().concat(dividerPackets);

packets.sort((a, b) => compare(b, a));
const dividerIndices: number[] = [];
dividerPackets.forEach((packet) => {
  dividerIndices.push(packets.indexOf(packet) + 1);
});

const result2 = dividerIndices.reduce((a, b) => a * b, 1);
console.log(result2);
