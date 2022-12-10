import { readFile } from '../fileHelper';

const content = readFile(10);

const instructions = content.split('\n');
let register = 1;
let cycle = 1;
const cyclesToTest = [20, 60, 100, 140, 180, 220];
const signals: number[] = [];
let CRT = '';

checkCycle();
addPixel();
instructions.forEach((instruction) => {
  const [type, _amount] = instruction.split(' ');
  const amount = parseInt(_amount);
  switch (type) {
    case 'noop': {
      addPixel();
      cycle++;
      checkCycle();
      break;
    }
    case 'addx': {
      addPixel();
      cycle++;
      checkCycle();
      register += amount;
      addPixel();
      cycle++;
      checkCycle();
      break;
    }
  }
});

function checkCycle() {
  if (cycle === cyclesToTest[0]) {
    signals.push(cycle * register);
    cyclesToTest.shift();
  }
}
function addPixel() {
  const sprite = [register - 1, register, register + 1];
  if (sprite.includes(cycle % 40)) {
    CRT += '#';
  } else {
    CRT += '.';
  }
}

const result = signals.reduce((a, b) => a + b, 0);
console.log(result);

//part 2
const output = CRT.match(/.{40}/g);
output?.forEach((line) => {
  console.log(line);
});
