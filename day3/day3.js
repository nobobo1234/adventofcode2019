const fs = require('fs');
const input = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map(e => e.split(','));

let intersections = [];

function part1() {
    const lineCoordinates = [];

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        lineCoordinates.push(new Set([[0, 0]]));
        let currentCoordinates = [0, 0];
        for (const instruction of line) {
            const direction = instruction[0];
            const magnitude = Number(instruction.slice(1));

            if (direction === 'R') {
                let x;
                for (
                    x = currentCoordinates[0] + 1;
                    x < currentCoordinates[0] + magnitude;
                    x++
                ) {
                    // Using strings cause Set uses === for comparison
                    lineCoordinates[i].add(`${x} ${currentCoordinates[1]}`);
                }
                currentCoordinates = [x, currentCoordinates[1]];
            } else if (direction === 'L') {
                let x;
                for (
                    x = currentCoordinates[0] - 1;
                    x > currentCoordinates[0] - magnitude;
                    x--
                ) {
                    lineCoordinates[i].add(`${x} ${currentCoordinates[1]}`);
                }
                currentCoordinates = [x, currentCoordinates[1]];
            } else if (direction === 'U') {
                let y;
                for (
                    y = currentCoordinates[1] + 1;
                    y < currentCoordinates[1] + magnitude;
                    y++
                ) {
                    lineCoordinates[i].add(`${currentCoordinates[0]} ${y}`);
                }
                currentCoordinates = [currentCoordinates[0], y];
            } else if (direction === 'D') {
                let y;
                for (
                    y = currentCoordinates[1] - 1;
                    y > currentCoordinates[1] - magnitude;
                    y--
                ) {
                    lineCoordinates[i].add(`${currentCoordinates[0]} ${y}`);
                }
                currentCoordinates = [currentCoordinates[0], y];
            }
        }
    }

    const same = new Set();
    for (const coordinate of lineCoordinates[0]) {
        if (lineCoordinates[1].has(coordinate)) {
            same.add(coordinate);
        }
    }

    intersections = Array.from(same);

    const distances = Array.from(same).map(
        coordinate =>
            Math.abs(Number(coordinate.split(' ')[0])) +
            Math.abs(Number(coordinate.split(' ')[1]))
    );
    return Math.min(...distances);
}

function part2() {
    const lineCoordinates = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        lineCoordinates.push([]);
        let currentCoordinates = [0, 0];
        for (const instruction of line) {
            const direction = instruction[0];
            const magnitude = Number(instruction.slice(1));

            if (direction === 'R') {
                let x;
                for (
                    x = currentCoordinates[0];
                    x < currentCoordinates[0] + magnitude;
                    x++
                ) {
                    // Using strings cause Set uses === for comparison
                    lineCoordinates[i].push(`${x} ${currentCoordinates[1]}`);
                }
                currentCoordinates = [x, currentCoordinates[1]];
            } else if (direction === 'L') {
                let x;
                for (
                    x = currentCoordinates[0];
                    x > currentCoordinates[0] - magnitude;
                    x--
                ) {
                    lineCoordinates[i].push(`${x} ${currentCoordinates[1]}`);
                }
                currentCoordinates = [x, currentCoordinates[1]];
            } else if (direction === 'U') {
                let y;
                for (
                    y = currentCoordinates[1];
                    y < currentCoordinates[1] + magnitude;
                    y++
                ) {
                    lineCoordinates[i].push(`${currentCoordinates[0]} ${y}`);
                }
                currentCoordinates = [currentCoordinates[0], y];
            } else if (direction === 'D') {
                let y;
                for (
                    y = currentCoordinates[1];
                    y > currentCoordinates[1] - magnitude;
                    y--
                ) {
                    lineCoordinates[i].push(`${currentCoordinates[0]} ${y}`);
                }
                currentCoordinates = [currentCoordinates[0], y];
            }
        }
    }

    const distances = intersections.map(coordinate => {
        return (
            lineCoordinates[0].indexOf(coordinate) +
            lineCoordinates[1].indexOf(coordinate)
        );
    });
    return Math.min(...distances);
}

console.log(part1());
console.log(part2());
