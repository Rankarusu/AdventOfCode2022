import { readFile } from '../fileHelper';

const values = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; //we can just run indexof a letter here. The underscore is there to start at 1

const content = readFile(3);
const lines = content.split('\n');
const compartments = lines.map((line) => {
  // works because always even numbers
  return [line.slice(0, line.length / 2), line.slice(line.length / 2)];
});

const result = compartments.reduce((a, b) => {
  const intersection = Array.from(b[0]).find((char) =>
    Array.from(b[1]).includes(char)
  );
  const priority = values.indexOf(intersection!);

  return a + priority;
}, 0);

console.log(result);

//part 2
const groups: string[][] = [];

//split lines in groups of three
for (let i = 0; i < lines.length; i += 3) {
  const chunk = lines.slice(i, i + 3);
  groups.push(chunk);
}

const result2 = groups.reduce((a, b) => {
  const intersection = Array.from(b[0]).find(
    (char) => Array.from(b[1]).includes(char) && Array.from(b[2]).includes(char)
  );

  const priority = values.indexOf(intersection!);

  return a + priority;
}, 0);

console.log(result2);
