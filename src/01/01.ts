import { readFile } from '../fileHelper';

const content = readFile(1);

const sums = content
  .split(/\n\s*\n/)
  .map((elf) => elf.split('\n'))
  .map((numberStrings) =>
    numberStrings.map((numberString) => parseInt(numberString))
  )
  .map((arr) => arr.reduce((a, b) => a + b, 0));

console.log(Math.max(...sums));

//// actual one liner for fun
// console.log(
//   Math.max(
//     ...readFile(1)
//       .split(/\n\s*\n/)
//       .map((elf) => elf.split('\n'))
//       .map((numberStrings) =>
//         numberStrings.map((numberString) => parseInt(numberString))
//       )
//       .map((arr) => arr.reduce((a, b) => a + b, 0))
//   )
// );
