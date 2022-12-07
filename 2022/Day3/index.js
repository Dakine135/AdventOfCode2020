/*

--- Day 3: Rucksack Reorganization ---

One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

    The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
    The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
    The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
    The fourth rucksack's compartments only share item type v.
    The fifth rucksack's compartments only share item type t.
    The sixth rucksack's compartments only share item type s.

To help prioritize item rearrangement, every item type can be converted to a priority:

    Lowercase item types a through z have priorities 1 through 26.
    Uppercase item types A through Z have priorities 27 through 52.

In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

Your puzzle answer was 7691.

The first half of this puzzle is complete! It provides one gold star: *
--- Part Two ---

As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg

And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?



*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

const SCORE_OFFSET_UPPERCASE = -38;
const SCORE_OFFSET_LOWERCASE = -96;

function stringToSortedSet(string) {
    let obj = {};
    string.split('').forEach((x) => (obj[x.charCodeAt()] = true));
    return Object.keys(obj).map((x) => {
        let char = String.fromCharCode(Number(x));
        if (char.match(/^[A-Z]$/)) return char.charCodeAt() + SCORE_OFFSET_UPPERCASE;
        if (char.match(/^[a-z]$/)) return char.charCodeAt() + SCORE_OFFSET_LOWERCASE;
        console.log('We should not be here, char not capital or lowercase');
    });
}

async function setup() {
    const config = {
        year: 2022,
        day: 3
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
            let output = text.split('\n');
            let c1, c2;
            output = output.map((x) => {
                // c1 = x
                //     .substring(0, x.length / 2)
                //     .split('')
                //     .map((x) => x.charCodeAt())
                //     .sort((a, b) => a - b);
                // c2 = x
                //     .substring(x.length / 2)
                //     .split('')
                //     .map((x) => x.charCodeAt())
                //     .sort((a, b) => a - b);
                c1 = stringToSortedSet(x.substring(0, x.length / 2));
                c2 = stringToSortedSet(x.substring(x.length / 2));
                // combined = c1 + c2;
                // console.log('x.length, combined.length :>> ', x.length, combined.length, c1.length, c2.length);
                // console.log('x, c1, c2 :>> ', x, c1, c2);
                return [c1, c2, stringToSortedSet(x)];
            });
            // console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}
//Utilities.binarySearch(input[0][1], input[0][0][0]);
function findDuplicate(mainArray, searchArray) {
    for (let i = 0; i < mainArray.length; i++) {
        if (searchArray.indexOf(mainArray[i]) >= 0) return mainArray[i];
    }
}

function findDuplicates(mainArray, searchArray) {
    let duplicates = [];
    for (let i = 0; i < mainArray.length; i++) {
        if (searchArray.indexOf(mainArray[i]) >= 0) duplicates.push(mainArray[i]);
    }
    return duplicates;
}

function findDuplicatePart2(elf1, elf2, elf3) {
    let firstTwoDuplicates = findDuplicates(elf1, elf2);
    return findDuplicates(firstTwoDuplicates, elf3)[0];
}

function main(input) {
    console.log('input', input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    //Lowercase item types a through z have priorities 1 through 26.
    //Uppercase item types A through Z have priorities 27 through 52.
    // console.log('A, B, Z, a, b, z :>> ', 'A'.charCodeAt() - 38, 'B'.charCodeAt() - 38, 'Z'.charCodeAt() - 38, 'a'.charCodeAt() - 96, 'b'.charCodeAt() - 96, 'z'.charCodeAt() - 96);

    let duplicates = input.map((x) => findDuplicate(x[0], x[1]));
    console.log('duplicates :>> ', duplicates);

    part1 = duplicates.reduce((sum, current) => sum + current, 0);

    let duplicatesPart2 = [];
    for (let i = 0; i < input.length; i += 3) {
        duplicatesPart2.push(findDuplicatePart2(input[i][2], input[i + 1][2], input[i + 2][2]));
    }

    console.log('duplicatesPart2 :>> ', duplicatesPart2);

    part2 = duplicatesPart2.reduce((sum, current) => sum + current, 0);

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //7691
    console.log('Part 2:', part2); //2508
}

setup();
