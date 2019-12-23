const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

function part1() {
    let sum = 0;
    for (const mass of input) {
        const fuel = Math.floor(mass / 3) - 2;
        sum += fuel;
    }
    return sum;
}

function part2() {
    let sum = 0;
    for (const mass of input) {
        let fuel = Math.floor(mass / 3) - 2;
        while (fuel > 0) {
            sum += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
    }
    return sum;
}

console.log(part1());
console.log(part2());
