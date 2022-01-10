/*
--- Day 14: Extended Polymerization ---

The incredible pressures at this depth are starting to put a strain on your submarine. The submarine has polymerization equipment that would produce suitable materials to reinforce the submarine, and the nearby volcanically-active caves should even have the necessary input elements in sufficient quantities.

The submarine manual contains instructions for finding the optimal polymer formula; specifically, it offers a polymer template and a list of pair insertion rules (your puzzle input). You just need to work out what polymer would result after repeating the pair insertion process a few times.

For example:

NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C

The first line is the polymer template - this is the starting point of the process.

The following section defines the pair insertion rules. A rule like AB -> C means that when elements A and B are immediately adjacent, element C should be inserted between them. These insertions all happen simultaneously.

So, starting with the polymer template NNCB, the first step simultaneously considers all three pairs:

    The first pair (NN) matches the rule NN -> C, so element C is inserted between the first N and the second N.
    The second pair (NC) matches the rule NC -> B, so element B is inserted between the N and the C.
    The third pair (CB) matches the rule CB -> H, so element H is inserted between the C and the B.

Note that these pairs overlap: the second element of one pair is the first element of the next pair. Also, because all pairs are considered simultaneously, inserted elements are not considered to be part of a pair until the next step.

After the first step of this process, the polymer becomes NCNBCHB.

Here are the results of a few steps using the above rules:

Template:     NNCB
After step 1: NCNBCHB
After step 2: NBCCNBBBCBHCB
After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB

This polymer grows quickly. After step 5, it has length 97; After step 10, it has length 3073. After step 10, B occurs 1749 times, C occurs 298 times, H occurs 161 times, and N occurs 865 times; taking the quantity of the most common element (B, 1749) and subtracting the quantity of the least common element (H, 161) produces 1749 - 161 = 1588.

Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

--- Part Two ---

The resulting polymer isn't nearly strong enough to reinforce the submarine. You'll need to run more steps of the pair insertion process; a total of 40 steps should do it.

In the above example, the most common element is B (occurring 2192039569602 times) and the least common element is H (occurring 3849876073 times); subtracting these produces 2188189693529.

Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const { createReadStream, createWriteStream, writeFileSync } = require('fs');
const { PassThrough, Duplex, Transform } = require('stream');

class Throttle extends Duplex {
    constructor(ms) {
        super();
        this.delay = ms;
    }

    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _read() {}

    _final() {
        this.push(null);
    }
}

class simulateBind extends Transform {
    constructor(rules) {
        super();
        this.rules = rules;
    }

    _transform(chunk, encoding, callback) {
        const newChunk = chunk; //do bind based on this.rules
        this.push(newChunk);
        callback();
    }

    _flush(callback) {
        this.push('more template chunks being bound');
        callback();
    }

    _final() {
        this.push(null);
    }
}
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 14
        // ignoreFile: true,
    };
    let rawInput = await Utilities.getInput(config);
    // console.log("rawInput :>> ", rawInput);

    const parseConfig = {
        rawInput,
        // ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let output = text.split('\n\n');
            let template = output[0];
            let rulesRaw = output[1].split('\n');

            let rules = {};
            rulesRaw.forEach((x) => {
                let split = x.split(' -> ');
                rules[split[0]] = `${split[0][0]}${split[1]}${split[0][1]}`;
            });
            let result = {
                template,
                rules
            };
            console.log('result :>> ', result);
            return result;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    await writeFileSync('inputStream.txt', input.template);

    main(input);
}

String.prototype.splitIntoPairs = function () {
    let pairs = {};
    let pair;
    for (let i = 0; i < this.length - 1; i++) {
        pair = this[i] + this[i + 1];
        if (!(pair in pairs)) pairs[pair] = 0;
        pairs[pair]++;
    }
    return pairs;
};

Object.prototype.countCharacters = function (lastChar) {
    let counts = {};
    counts[lastChar] = 1;
    Object.entries(this).forEach(([pair, count]) => {
        if (!(pair[0] in counts)) counts[pair[0]] = 0;
        // if (!(pair[1] in counts)) counts[pair[1]] = 0;
        counts[pair[0]] += count;
        // counts[pair[1]] += count;
    });
    return counts;
};

Array.prototype.collapsePairs = function () {
    let result = '';
    this.forEach((pair, index) => {
        if (index == this.length - 1) result += pair;
        else result += pair[0] + pair[1];
    });
    return result;
};

function simulateStep(template, rules) {
    let result = {};
    Object.entries(template).forEach(([pair, count]) => {
        let newString = rules[pair];
        let newPairOne = newString[0] + newString[1];
        let newPairTwo = newString[1] + newString[2];
        if (!(newPairOne in result)) result[newPairOne] = 0;
        if (!(newPairTwo in result)) result[newPairTwo] = 0;
        result[newPairOne] += count;
        result[newPairTwo] += count;
    });
    return result;
}

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    //test data
    let testTemplate = 'NNCB';
    let testRules = {
        CH: 'CBH',
        HH: 'HNH',
        CB: 'CHB',
        NH: 'NCH',
        HB: 'HCB',
        HC: 'HBC',
        HN: 'HCN',
        NN: 'NCN',
        BH: 'BHH',
        NC: 'NBC',
        NB: 'NBB',
        BN: 'BBN',
        BB: 'BNB',
        BC: 'BBC',
        CC: 'CNC',
        CN: 'CCN'
    };

    // console.log('testTemplate :>> ', testTemplate);
    // console.log('testRules :>> ', testRules);
    // let lastChar = testTemplate[testTemplate.length - 1];

    // let testPairs = testTemplate.splitIntoPairs();
    // console.log('testPairs :>> ', testPairs);
    // let numberOfSteps = 10;
    // for (let x = 0; x < numberOfSteps; x++) {
    //     console.log('STEP :>> ', x + 1);
    //     testPairs = simulateStep(testPairs, testRules);
    //     console.log('testPairs :>> ', testPairs);
    // }

    // let counts = testPairs.countCharacters(lastChar);
    // let highestCountTest = -Infinity;
    // let lowestCountTest = Infinity;
    // Object.values(counts).forEach((count) => {
    //     if (count > highestCountTest) highestCountTest = count;
    //     if (count < lowestCountTest) lowestCountTest = count;
    // });
    // console.log('counts, highestCountTest, lowestCountTest :>> ', counts, highestCountTest, lowestCountTest);
    // let testPart1 = highestCountTest - lowestCountTest;
    // console.log('testPart1 :>> ', testPart1); //1599

    let { template, rules } = input;

    //setup streams
    // const readStream = createReadStream('./inputStream.txt');
    // const writeStream = createWriteStream('./outputStream.txt', {
    //     //highWaterMark: 200000
    // });

    // const chunks = new PassThrough();
    // const throttle = new Throttle(10);

    // var simulateBindStream = new simulateBind(rules);

    // chunks.on('data', (chunk) => {
    //     console.log('chunk :>> ', chunk.toString());
    // });

    // readStream.pipe(throttle).pipe(simulateBindStream).pipe(chunks).pipe(writeStream).on('error', console.error);

    /**
     * Part 1
     */
    let pairs = template.splitIntoPairs();
    let lastChar = template[template.length - 1];
    console.log('pairs :>> ', pairs);
    let numberOfSteps = 10;
    for (let x = 0; x < numberOfSteps; x++) {
        console.log('STEP :>> ', x + 1);
        pairs = simulateStep(pairs, rules);
        console.log('pairs :>> ', pairs);
    }

    let counts = pairs.countCharacters(lastChar);
    let highestCount = -Infinity;
    let lowestCount = Infinity;
    Object.values(counts).forEach((count) => {
        if (count > highestCount) highestCount = count;
        if (count < lowestCount) lowestCount = count;
    });
    console.log('counts, highestCount, lowestCount :>> ', counts, highestCount, lowestCount);
    part1 = highestCount - lowestCount;
    console.log('Part 1:', part1); // 2587

    /**
     * Part 2
     * It is currently crashing at step 23, running out of memory
     * Might need to experiment with file streaming and calculate this in parts
     */

    let numberOfStepsPart2 = 40; //Needs to be 40, crashes at 23
    for (let x = numberOfSteps; x < numberOfStepsPart2; x++) {
        console.log('Starting STEP', x + 1);
        pairs = simulateStep(pairs, rules);
        // console.log('pairs :>> ', pairs);
    }

    counts = pairs.countCharacters(lastChar);
    highestCount = -Infinity;
    lowestCount = Infinity;
    Object.values(counts).forEach((count) => {
        if (count > highestCount) highestCount = count;
        if (count < lowestCount) lowestCount = count;
    });
    console.log('counts, highestCount, lowestCount :>> ', counts, highestCount, lowestCount);
    part2 = highestCount - lowestCount;

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 2:', part2); //3318837563123
}

setup();
