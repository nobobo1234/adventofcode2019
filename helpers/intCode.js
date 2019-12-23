function intCodeParser(intCode, inputValue) {
    const opcodes = [...intCode];

    let i = 0;
    while (opcodes[i]) {
        const reversedInstructions = opcodes[i]
            .toString()
            .split('')
            .reverse()
            .map(Number);
        let instruction = reversedInstructions[0];
        if (reversedInstructions.length > 1) {
            instruction += reversedInstructions[1] * 10;
        }
        const firstParamMode = reversedInstructions[2] || 0;
        const secondParamMode = reversedInstructions[3] || 0;
        const thirdParamMode = reversedInstructions[4] || 0;

        if (instruction === 1) {
            // Addition instruction adds first and second parameter
            const firstNumber = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const secondNumber = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];

            opcodes[opcodes[i + 3]] = firstNumber + secondNumber;
            i += 4;
        } else if (instruction === 2) {
            // Multiply Instruction: multiplies first and second parameter
            const firstNumber = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const secondNumber = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];

            opcodes[opcodes[i + 3]] = firstNumber * secondNumber;
            i += 4;
        } else if (instruction === 3) {
            // Input instruction: stores a given input value at the specified address
            opcodes[opcodes[i + 1]] = inputValue;

            i += 2;
        } else if (instruction === 4) {
            // Output instruction: outputs next param
            console.log(`Output: ${opcodes[opcodes[i + 1]]}`);

            i += 2;
        } else if (instruction === 5) {
            // Jump-if-true instruction: If first param is non-zero, set the instruction pointer to the value from the second parameter, otherwise, do nothing
            const number = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const valueToSet = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];
            if (number !== 0) {
                i = valueToSet;
            } else {
                i += 3;
            }
        } else if (instruction === 6) {
            // Jump-if-false instruction: If first param is zero, set the instruction pointer to value from second parameter, otherwise do nothing
            const number = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const valueToSet = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];
            if (number === 0) {
                i = valueToSet;
            } else {
                i += 3;
            }
        } else if (instruction === 7) {
            // Less than instruction: If first param is less that second param, store 1 in pos of param 3, otherwise, store 0 in that pos
            const firstNumber = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const secondNumber = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];
            if (firstNumber < secondNumber) {
                opcodes[opcodes[i + 3]] = 1;
            } else {
                opcodes[opcodes[i + 3]] = 0;
            }
            i += 4;
        } else if (instruction === 8) {
            // Equals instruction: If the first param equals the second param, store 1 in the pos of param 3, otherwise store 0 in that pos
            const firstNumber = firstParamMode
                ? opcodes[i + 1]
                : opcodes[opcodes[i + 1]];
            const secondNumber = secondParamMode
                ? opcodes[i + 2]
                : opcodes[opcodes[i + 2]];
            if (firstNumber === secondNumber) {
                opcodes[opcodes[i + 3]] = 1;
            } else {
                opcodes[opcodes[i + 3]] = 0;
            }
            i += 4;
        } else if (instruction === 99) {
            // Halt instruction: Halt the program
            break;
        }
    }

    return opcodes;
}

module.exports = intCodeParser;
