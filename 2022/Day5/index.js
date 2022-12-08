/*
--- Day 5: Supply Stacks ---

The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2

In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3

Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3

The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?



*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2022,
        day: 5
        // ignoreFile: true,
    };
    let rawInput = await Utilities.getInput(config);
    // console.log('rawInput :>> ', rawInput);

    // return;

    const parseConfig = {
        rawInput,
        ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let output = text.split('\n\n');
            let tokenized = output[0].split('\n').map((row) => {
                return row.match(/.{4}/g).map((x) => x.replaceAll(/[\[\] ]/g, ''));
            });
            let stackNames = tokenized[tokenized.length - 1];
            let stacks = Object.fromEntries(stackNames.map((x) => [x, []]));
            for (let i = tokenized.length - 2; i >= 0; i--) {
                let tokenRow = tokenized[i];
                tokenRow.forEach((crate, index) => {
                    if (crate.length > 0) stacks[stackNames[index]].push(crate);
                });
            }
            // console.log('stacks :>> ', stacks);

            let moves = output[1].split('\n');
            moves = moves.map((x) => {
                // console.log('x :>> ', x);
                let matches = x.match(/[0-9]+/g);
                return { from: Number(matches[1]), to: Number(matches[2]), count: Number(matches[0]) };
            });
            output = { stacks, moves };
            // console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

function main(input) {
    console.log('input', input);
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
