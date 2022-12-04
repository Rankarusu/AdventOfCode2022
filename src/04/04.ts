import { readFile } from '../fileHelper';

const content = readFile(4);
const assignmentRanges = content
  .split('\n')
  .map((line) =>
    line
      .split(',')
      .map((assignment) => assignment.split('-').map((id) => parseInt(id)))
  );

const result = assignmentRanges.filter((pair) => {
  if (
    //b contains a
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    //a contains b
    (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
  ) {
    return true;
  }
});

console.log(result.length);
