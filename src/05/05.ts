import { readFile } from '../fileHelper';

const content = readFile(5);

const crateRegex = /(   |\[\w\])\s?/g;
const instructionRegex = /move (\d+) from (\d+) to (\d+)/;

const [stacks, instructions] = content.split(/\n\s*\n/);
const crateLines = stacks.split('\n').slice(0, -1);
const instructionLines = instructions.split('\n');

const crateTowerAmount = Array.from(crateLines[0].matchAll(crateRegex)).length;

//initialize empty array
const towers: string[][] = [];
for (let i = 0; i < crateTowerAmount; i++) {
  towers.push([]);
}

crateLines.forEach((line) => {
  const crates = Array.from(line.matchAll(crateRegex));
  for (let i = 0; i < crates.length; i++) {
    const element = crates[i][0].trim();
    if (element !== '') {
      towers[i].push(element);
    }
  }
});

instructionLines.forEach((line) => {
  const match = line.match(instructionRegex);

  const amount = parseInt(match![1]);
  const from = parseInt(match![2]);
  const to = parseInt(match![3]);

  for (let i = 0; i < amount; i++) {
    const element = towers[from - 1].shift();
    towers[to - 1].unshift(element!);
  }
});

const message = towers
  .map((tower) => tower[0])
  .join()
  .replaceAll(/\[|\]|,/g, '');

console.log(message);
