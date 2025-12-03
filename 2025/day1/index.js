const fs = require('fs');
const path = require('path');

const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0);


const testData = [
  'L68',
  'L30',
  'R48',
  'L5',
  'R60',
  'L55',
  'L1',
  'L99',
  'R14',
  'L82',
];

function day1(data) {
  let start = 50;
  let pointAt0 = 0;
  for (const instruction of data) {
    const direction = instruction[0];
    const steps = parseInt(instruction.slice(1));
    if (direction === 'R') {
      start = start + steps;

      while (start > 99) {
        start -= 100;
        if (start === 0) {
          pointAt0 += 1;
        }
      }
    } else {
      start = start - steps;
      if (start === 0) {
        pointAt0 += 1;
      }
      while (start < 0) {
        start += 100;
        if (start === 0) {
          pointAt0 += 1;
        }
      }
    }
  }
  return pointAt0;
}

console.log(day1(data));
