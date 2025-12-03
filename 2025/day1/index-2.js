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

function getAnswer(data) {
  let pos = 50; // starting dial position
  let hits = 0; // total times the dial points at 0

  for (const instruction of data) {
    const dir = instruction[0]; // 'L' or 'R'
    const steps = Number(instruction.slice(1));

    if (steps === 0) continue;

    let first;

    if (dir === 'R') {
      // first time we land on 0 when moving right
      first = pos === 0 ? 100 : 100 - pos;
    } else if (dir === 'L') {
      // first time we land on 0 when moving left
      first = pos === 0 ? 100 : pos;
    } else {
      throw new Error(`Unknown direction: ${dir}`);
    }

    if (first <= steps) {
      hits += 1 + Math.floor((steps - first) / 100);
    }

    // update position after the move
    if (dir === 'R') {
      pos = (pos + steps) % 100;
    } else {
      pos = (pos - steps) % 100;
      if (pos < 0) pos += 100;
    }
  }

  return hits;
}

console.log(getAnswer(data));
