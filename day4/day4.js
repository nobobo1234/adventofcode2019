const fs = require('fs');
const input = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('-')
    .map(Number);

function part1() {
    let count = 0;
    for (let i = input[0]; i <= input[1]; i++) {
        const digitArray = i
            .toString()
            .split('')
            .map(Number);
        let previousDigit = 0;
        let decreased = false;
        let adjecent = false;

        for (const digit of digitArray) {
            if (previousDigit === digit) {
                adjecent = true;
            }
            if (previousDigit > digit) {
                decreased = true;
                break;
            }
            previousDigit = digit;
        }

        if (!decreased && adjecent) count++;
    }
    return count;
}

function part2() {
    let count = 0;
    for (let i = input[0]; i <= input[1]; i++) {
        const digitArray = i
            .toString()
            .split('')
            .map(Number);
        let decreased = false;
        let adjecent = false;
        let sameDigitCount = 0;

        for (let j = 0; j < digitArray.length; j++) {
            const previousDigit = digitArray[j - 1] || 0;
            const digit = digitArray[j];

            if (digit === previousDigit) sameDigitCount++;
            if (
                (digit !== previousDigit && sameDigitCount === 1) ||
                (j === digitArray.length - 1 && sameDigitCount === 1)
            ) {
                adjecent = true;
                sameDigitCount = 0;
            }

            if (previousDigit > digit) {
                decreased = true;
                break;
            }
        }

        if (!decreased && adjecent) console.log(i);
        if (!decreased && adjecent) count++;
    }
    return count;
}

console.log(part1());
console.log(part2());
