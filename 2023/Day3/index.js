/*
--- Day 3: Gear Ratios ---

You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, 
but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, 
but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. 
"Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. 
If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. 
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, 
is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2023,
        day: 3
        // ignoreFile: true
    };
    let rawInput = await Utilities.getInput(config);
    // console.log('rawInput :>> ', rawInput);

    const parseConfig = {
        rawInput,
        // ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let input = text.split('\n');
            const output = { raw: input, numbers: [] };
            input.forEach((x, index) => {
                x = x.replaceAll('.', ' ');
                // x = x.replaceAll(/[^\d ]/g, '%');
                const matches = x.matchAll(/\d+/g);
                for (const match of matches) {
                    output.numbers.push({ number: Number(match[0]), rowIndex: index, startIndex: match.index, endIndex: match.index + match[0].length });
                }
                return x;
            });
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

function findSymbols({ number, rowIndex, startIndex, endIndex }, raw) {
    let rowAbove = rowIndex == 0 ? '' : raw[rowIndex - 1].slice(startIndex - 1, endIndex + 1);
    let rowBelow = rowIndex == raw.length - 1 ? '' : raw[rowIndex + 1].slice(startIndex - 1, endIndex + 1);
    let before = startIndex > 0 ? raw[rowIndex][startIndex - 1] : '';
    let after = endIndex < raw[rowIndex].length - 1 ? raw[rowIndex][endIndex] : '';
    let surroundings = `${rowAbove}${rowBelow}${before}${after}`;
    surroundings = surroundings.replaceAll(/[. \d]/g, '');
    // console.log('surroundings :>> ', surroundings);
    if (surroundings.length > 0) return surroundings;
    return null;
}

function main({ raw, numbers }) {
    // console.log('raw, numbers :>> ', raw, numbers);
    let startTime = Utilities.getNanoSecTime();
    let part1 = 0;
    let part2 = null;

    numbers = numbers.map((entry) => {
        // if (DEBUG) console.log('=========================================');
        const { number, row, startIndex, endIndex } = entry;
        // console.log('number, rowIndex, startIndex, endIndex :>> ', number, rowIndex, startIndex, endIndex);
        entry.symbols = findSymbols(entry, raw);
        if (entry.symbols) part1 += number;

        return entry;
        // if (DEBUG) console.log('=========================================');
    });

    // console.log('numbers :>> ', numbers);

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //530536 too low
    console.log('Part 2:', part2);
}

setup();
