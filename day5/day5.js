const fs = require('fs');
const intCodeParser = require('../helpers/intCode');

const input = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map(Number);

function part1() {
    const opcodes = [...input];

    intCodeParser(opcodes, 1);
}

function part2() {
    const opcodes = [...input];

    intCodeParser(opcodes, 5);
}

console.log(part1());
console.log(part2());
