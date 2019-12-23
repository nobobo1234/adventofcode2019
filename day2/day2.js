const fs = require('fs');
const input = fs
    .readFileSync('./input.txt', 'utf8')
    .split(',')
    .map(Number);

function part1() {
    const opcodes = [...input];
    opcodes[1] = 12;
    opcodes[2] = 2;
    for (let i = 0; i < opcodes.length; i += 4) {
        if (opcodes[i] === 1) {
            opcodes[opcodes[i + 3]] =
                opcodes[opcodes[i + 1]] + opcodes[opcodes[i + 2]];
        } else if (opcodes[i] === 2) {
            opcodes[opcodes[i + 3]] =
                opcodes[opcodes[i + 1]] * opcodes[opcodes[i + 2]];
        } else if (opcodes[i] === 99) {
            break;
        }
    }
    return opcodes[0];
}

function part2() {
    const expectedOpcode = 19690720;
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const opcodes = [...input];
            opcodes[1] = noun;
            opcodes[2] = verb;
            for (let i = 0; i < opcodes.length; i += 4) {
                if (opcodes[i] === 1) {
                    opcodes[opcodes[i + 3]] =
                        opcodes[opcodes[i + 1]] + opcodes[opcodes[i + 2]];
                } else if (opcodes[i] === 2) {
                    opcodes[opcodes[i + 3]] =
                        opcodes[opcodes[i + 1]] * opcodes[opcodes[i + 2]];
                } else if (opcodes[i] === 99) {
                    break;
                }
            }
            if (opcodes[0] === expectedOpcode) {
                return 100 * noun + verb;
            }
        }
    }
}

console.log(part1());
console.log(part2());
