import { readFile } from '../fileHelper';

const values = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; //we can just run indexof a letter here. The underscore is there to start at 1

const content = readFile(3);
const lines = content.split('\n');
const compartments = lines.map((line) => {
  // works because always even numbers
  return [line.slice(0, line.length / 2), line.slice(line.length / 2)];
});

const result = compartments.reduce((a, b) => {
  const intersection = Array.from(b[0]).filter((value) =>
    Array.from(b[1]).includes(value)
  );
  const priority = values.indexOf(intersection[0]);

  return a + priority;
}, 0);

console.log(result);
