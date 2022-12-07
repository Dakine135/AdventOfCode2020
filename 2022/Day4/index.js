/*
--- Day X: Description ---


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: null,
        day: null
        // ignoreFile: true,
    };
    let rawInput = await Utilities.getInput(config);
    console.log('rawInput :>> ', rawInput);

    return;

    const parseConfig = {
        rawInput,
        ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let output = text.split('\n');
            output = output.map((x) => {
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

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    input.forEach((entry) => {
        // if (DEBUG) console.log('=========================================');
        // if (DEBUG) console.log('=========================================');
    });

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1);
    console.log('Part 2:', part2);
}

setup();
