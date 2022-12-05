import { readFile } from '../fileHelper';

const content = readFile(5);

const crateRegex = /(   |\[\w\])\s?/g;
const instructionRegex = /move (\d+) from (\d+) to (\d+)/;

const [stacks, instructions] = content.split(/\n\s*\n/);
const crateLines = stacks.split('\n').slice(0, -1);
const instructionLines = instructions.split('\n');

const crateTowerAmount = Array.from(crateLines[0].matchAll(crateRegex)).length;

function setupTowers() {
  const crateTowers: string[][] = [];
  for (let i = 0; i < crateTowerAmount; i++) {
    crateTowers.push([]);
  }
  crateLines.forEach((line) => {
    const crates = Array.from(line.matchAll(crateRegex));
    for (let i = 0; i < crates.length; i++) {
      const element = crates[i][0].trim();
      if (element !== '') {
        crateTowers[i].push(element);
      }
    }
  });
  return crateTowers;
}
function displayResult(towers: string[][]) {
  const message = towers
    .map((tower) => tower[0])
    .join()
    .replaceAll(/\[|\]|,/g, '');

  console.log(message);
}

let towers: string[][] = setupTowers();

function crateMove9k(amount: number, from: number, to: number) {
  for (let i = 0; i < amount; i++) {
    const element = towers[from].shift();
    towers[to].unshift(element!);
  }
}

function carryOutInstructions(
  instructions: string[],
  crane: (amount: number, from: number, to: number) => void
) {
  instructions.forEach((line) => {
    const match = line.match(instructionRegex);

    const amount = parseInt(match![1]);
    const from = parseInt(match![2]) - 1;
    const to = parseInt(match![3]) - 1;

    crane(amount, from, to);
  });
}

carryOutInstructions(instructionLines, crateMove9k);

displayResult(towers);

//part 2
towers = setupTowers(); //reset
function crateMove9k1(amount: number, from: number, to: number) {
  const elements = towers[from].splice(0, amount);
  towers[to].unshift(...elements);
}
carryOutInstructions(instructionLines, crateMove9k1);
displayResult(towers);
