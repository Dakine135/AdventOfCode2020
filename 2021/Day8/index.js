/*
--- Day 8: Seven Segment Search ---

You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.

As your submarine slowly makes its way through the cave system, you notice that the four-digit seven-segment displays in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.

Each digit of a seven-segment display is rendered by turning on or off any of seven segments named a through g:

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

So, to render a 1, only segments c and f would be turned on; the rest would be off. To render a 7, only segments a, c, and f would be turned on.

The problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires a through g, but those wires are connected to segments randomly. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits within a display use the same connections, though.)

So, you might know that only signal wires b and g are turned on, but that doesn't mean segments b and g are turned on: the only digit that uses two segments is 1, so it must mean segments c and f are meant to be on. With just that information, you still can't tell which wire (b/g) goes to which segment (c/f). For that, you'll need to collect more information.

For each display, you watch the changing signals for a while, make a note of all ten unique signal patterns you see, and then write down a single four digit output value (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.

For example, here is what you might see in a single entry in your notes:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf

(The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)

Each entry consists of ten unique signal patterns, a | delimiter, and finally the four digit output value. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because 7 is the only digit that uses three segments, dab in the above example means that to render a 7, signal lines d, a, and b are on. Because 4 is the only digit that uses four segments, eafb means that to render a 4, signal lines e, a, f, and b are on.

Using this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (cdfeb fcadb cdfeb cdbaf) use five segments and are more difficult to deduce.

For now, focus on the easy digits. Consider this larger example:

be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce

Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).

In the output values, how many times do digits 1, 4, 7, or 8 appear?

--- Part Two ---

Through a little deduction, you should now be able to determine the remaining digits. Consider again the first example above:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf

After some careful analysis, the mapping between signal wires and segments only make sense in the following configuration:

 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc

So, the unique signal patterns would correspond to the following digits:

    acedgfb: 8
    cdfbe: 5
    gcdfa: 2
    fbcad: 3
    dab: 7
    cefabd: 9
    cdfgeb: 6
    eafb: 4
    cagedb: 0
    ab: 1

Then, the four digits of the output value can be decoded:

    cdfeb: 5
    fcadb: 3
    cdfeb: 5
    cdbaf: 3

Therefore, the output value for this entry is 5353.

Following this same process for each entry in the second, larger example above, the output value of each entry can be determined:

    fdgacbe cefdb cefbgd gcbe: 8394
    fcgedb cgb dgebacf gc: 9781
    cg cg fdcagb cbg: 1197
    efabcd cedba gadfec cb: 9361
    gecf egdcabf bgf bfgea: 4873
    gebdcfa ecba ca fadegcb: 8418
    cefg dcbef fcge gbcadfe: 4548
    ed bcgafe cdgba cbgef: 1625
    gbdfcae bgc cg cgb: 8717
    fgae cfgab fg bagce: 4315

Adding all of the output values in this larger example produces 61229.

For each entry, determine all of the wire/segment connections and decode the four-digit output values. What do you get if you add up all of the output values?


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 8
        // ignoreFile: true,
    };
    let rawInput = await Utilities.getInput(config);
    // console.log("rawInput :>> ", rawInput);

    const parseConfig = {
        rawInput,
        // ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let output = text.split('\n');
            output = output.map((x) => {
                let split = x.split(' | ');
                let patterns = split[0].split(' ');
                patterns = patterns.map((x) => x.split('').sort().join(''));
                patterns.sortChar();
                let digits = split[1].split(' ');
                digits = digits.map((x) => x.split('').sort().join(''));
                return { patterns, digits };
            });
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

const possibilitiesByLength = { 2: [1], 3: [7], 4: [4], 5: [2, 3, 5], 6: [0, 6, 9], 7: [8] };
const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const segmentsByUsage = { 4: ['e'], 6: ['b'], 7: ['d', 'g'], 8: ['a', 'c'], 9: ['f'] };
const segmentMapping = { abcefg: 0, cf: 1, acdeg: 2, acdfg: 3, bcdf: 4, abdfg: 5, abdefg: 6, acf: 7, abcdefg: 8, abcdfg: 9 };
const digitMapping = { 0: 'abcefg', 1: 'cf', 2: 'acdeg', 3: 'acdfg', 4: 'bcdf', 5: 'abdfg', 6: 'abdefg', 7: 'acf', 8: 'abcdefg', 9: 'abcdfg' };

String.prototype.toDashedString = function () {
    let output = '';
    allSegments.forEach((letter) => {
        if (this.includes(letter)) output += letter;
        else output += '-';
    });
    return output;
};

Object.prototype.optionsLog = function () {
    Object.entries(this).forEach(([pattern, options]) => {
        console.log(pattern.toDashedString(), options);
    });
};
Object.prototype.isDecoded = function () {
    //filter out patterns that only have 1 option, see if any are left.
    //if all only have 1 option, then it is decoded and length would be 0
    return Object.values(this).filter((x) => x.options.length > 1).length == 0;
};

function decodeDigits(input) {
    let { patterns: PatternsRaw, digits } = input;
    let debug = false;
    //a:8, b:6, c:8, d:7, e:4, f:9, g:7
    let patterns = {};
    let conversionOptions = {};
    let segmentUsageCount = {};
    allSegments.forEach((letter) => {
        segmentUsageCount[letter] = 0;
    });

    //setup inital options based on length and calculate segment usage
    PatternsRaw.forEach((pattern) => {
        patterns[pattern] = {};
        patterns[pattern].pattern = pattern;
        patterns[pattern].converted = '';
        patterns[pattern].options = possibilitiesByLength[pattern.length];
        for (let i = 0; i < pattern.length; i++) {
            let char = pattern[i];
            patterns[pattern].converted += '?';
            segmentUsageCount[char]++;
        }
    });
    // console.log('segmentUsageCount :>> ', segmentUsageCount);
    //determine segmention conversion options based on usage
    Object.entries(segmentUsageCount).forEach(([char, count]) => {
        conversionOptions[char] = segmentsByUsage[count];
    });
    if (debug) patterns.optionsLog();
    if (debug) console.log('conversionOptions :>> ', conversionOptions);
    //END SETUP PART

    //use conversion options to keep eliminating options to get to final conversion.
    let conversionProgress = false;
    let conversionOptionsUpdateProgress = false;
    let firstTime = true;
    let count = 0;
    let finalConversionMapping = {};
    while (firstTime || conversionProgress || conversionOptionsUpdateProgress) {
        count++;
        if (debug) console.log('==============================================================');
        if (debug) console.log('Iteration ', count);
        if (count >= 100) {
            console.log('count limit reached in while loop');
            break;
        }
        conversionProgress = false;
        conversionOptionsUpdateProgress = false;
        firstTime = false;
        Object.entries(patterns).forEach(([pattern, data]) => {
            if (data.applyConversion(conversionOptions)) conversionProgress = true;
        });
        //try to update converstion options based on only 1 ? being left and digit is known
        Object.entries(patterns).forEach(([pattern, data]) => {
            if (conversionOptions.updateConversionOptionsFromPattern(data)) conversionOptionsUpdateProgress = true;
        });

        //sort converted pattern if complete and match to Digit
        Object.entries(patterns).forEach(([pattern, data]) => {
            if (data.converted.numberOfChar('?') == 0) {
                data.converted = data.converted.split('').sort().join('');
                // console.log('data.converted :>> ', data.converted);
                let digit = segmentMapping[data.converted];
                // console.log('digit :>> ', digit);
                data.options = [digit];
                finalConversionMapping[pattern] = digit;
            }
        });

        if (debug) console.log('conversionOptions :>> ', conversionOptions);
        if (debug) patterns.optionsLog();
        if (debug) console.log('==============================================================');
    }

    if (debug) console.log('finalConversionMapping :>> ', finalConversionMapping);
    if (debug) console.log('options.isDecoded() :>> ', patterns.isDecoded());

    //use final mapping to process the 4 digits
    let result = digits.map((digit) => {
        let sorted = digit.split('').sort().join('');
        return finalConversionMapping[sorted];
    });
    result = parseInt(result.join(''));

    return result;
}

Object.prototype.applyConversion = function (mapping) {
    let anyConverted = false;
    for (let i = 0; i < this.pattern.length; i++) {
        let char = this.pattern[i];
        if (mapping[char].length == 1 && this.converted[i] == '?') {
            anyConverted = true;
            let replacement = mapping[char][0];
            this.converted = this.converted.slice(0, i) + replacement + this.converted.slice(i + 1);
        }
    }
    return anyConverted;
};

Object.prototype.updateConversionOptionsFromPattern = function (data) {
    let anyProgress = false;
    if (data.options.length == 1 && data.converted.numberOfChar('?') == 1) {
        anyProgress = true;
        // console.log('ONlY 1 ? :>> ', data);
        //figure out missing char
        let digit = data.options[0];
        let segmentsOfDigit = digitMapping[digit].split('');
        let indexOfUnknownSegment = data.converted.indexOf('?');
        let patternChar = data.pattern[indexOfUnknownSegment];
        let knownSegments = data.converted.split('').filter((x) => x != '?');
        // console.log('segmentsOfDigit, knownSegments :>> ', segmentsOfDigit, knownSegments);
        let remainingSegment = segmentsOfDigit.filter((x) => !knownSegments.includes(x))[0];
        // console.log('remainingSegment :>> ', remainingSegment);
        //remove other options from segment, and remove segment from other char options
        this[patternChar] = [remainingSegment];
        Object.entries(this).forEach(([char, options]) => {
            // console.log('char, patternChar, remainingSegment, options :>> ', char, patternChar, remainingSegment, options);
            if (char != patternChar && options.includes(remainingSegment)) {
                this[char] = options.filter((x) => x != remainingSegment);
            }
        });
    }
    return anyProgress;
};

String.prototype.sortChar = function () {
    this.sort((a, b) => a.length - b.length);
};

String.prototype.numberOfChar = function (char) {
    return this.split('').filter((x) => x == char).length;
};

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = 0;
    let part2 = 0;

    let uniqueLengths = [2, 3, 4, 7]; //corrisponds to values/digits 1, 7, 4, and 8
    input.forEach((entry) => {
        let { patterns, digits } = entry;
        part1 += digits.filter((x) => uniqueLengths.includes(x.length)).length;
    });

    // console.log('input[0] :>> ', input[0]);
    part2 = 0;
    input.forEach((code) => {
        let decoded = decodeDigits(code);
        part2 += decoded;
        console.log('decoded :>> ', decoded);
    });

    // input.forEach((entry) => {
    //     let { patterns, digits } = entry;
    //     part1 += digits.filter((x) => Object.keys(uniqueLengths).includes(`${x.length}`)).length;
    // });

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //349
    console.log('Part 2:', part2); //1070957
}

setup();
