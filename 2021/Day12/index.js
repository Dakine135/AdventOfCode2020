/*
--- Day 12: Passage Pathing ---

With your submarine's subterranean subsystems subsisting suboptimally, the only way you're getting out of this cave anytime soon is by finding a path yourself. Not just a path - the only way to know if you've found the best path is to find all of them.

Fortunately, the sensors are still mostly working, and so you build a rough map of the remaining caves (your puzzle input). For example:

start-A
start-b
A-c
A-b
b-d
A-end
b-end

This is a list of how all of the caves are connected. You start in the cave named start, and your destination is the cave named end. An entry like b-d means that cave b is connected to cave d - that is, you can move between them.

So, the above cave system looks roughly like this:

    start
    /   \
c--A-----b--d
    \   /
     end

Your goal is to find the number of distinct paths that start at start, end at end, and don't visit small caves more than once. There are two types of caves: big caves (written in uppercase, like A) and small caves (written in lowercase, like b). It would be a waste of time to visit any small cave more than once, but big caves are large enough that it might be worth visiting them multiple times. So, all paths you find should visit small caves at most once, and can visit big caves any number of times.

Given these rules, there are 10 paths through this example cave system:

start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end

(Each line in the above list corresponds to a single path; the caves visited by that path are listed in the order they are visited and separated by commas.)

Note that in this cave system, cave d is never visited by any path: to do so, cave b would need to be visited twice (once on the way to cave d and a second time when returning from cave d), and since cave b is small, this is not allowed.

Here is a slightly larger example:

dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc

The 19 paths through it are as follows:

start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end

Finally, this even larger example has 226 paths through it:

fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW

How many paths through this cave system are there that visit small caves at most once?

--- Part Two ---

After reviewing the available paths, you realize you might have time to visit a single small cave twice. Specifically, big caves can be visited any number of times, a single small cave can be visited at most twice, and the remaining small caves can be visited at most once. However, the caves named start and end can only be visited exactly once each: once you leave the start cave, you may not return to it, and once you reach the end cave, the path must end immediately.

Now, the 36 possible paths through the first example above are:

start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end

The slightly larger example above now has 103 paths through it, and the even larger example now has 3509 paths through it.

Given these new rules, how many paths through this cave system are there?


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 12
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
                let parts = x.split('-');
                return parts;
            });
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

Array.prototype.convertToCaves = function () {
    let caves = {};
    this.forEach((link) => {
        let cave1 = link[0];
        let cave2 = link[1];
        // let cave1IsSmall = /^[a-z]*$/.test(cave1);
        // let cave2IsSmall = /^[a-z]*$/.test(cave2);
        if (!(cave1 in caves)) caves[cave1] = { name: cave1, links: [], isLarge: /^[A-Z]*$/.test(cave1) };
        if (!(cave2 in caves)) caves[cave2] = { name: cave2, links: [], isLarge: /^[A-Z]*$/.test(cave2) };
        if (!caves[cave1].links.includes(cave2)) caves[cave1].links.push(cave2);
        if (!caves[cave2].links.includes(cave1)) caves[cave2].links.push(cave1);
    });
    return caves;
};

Object.prototype.log = function () {
    let output = JSON.parse(JSON.stringify(this));
    output = Object.entries(output).map(([caveName, cave], index) => {
        cave.links = cave.links.join(',');
        return cave;
    });
    console.table(output);
};

function findPaths(caves, getValidLinksFunction) {
    let start = caves.start;
    let paths = [];
    start.links.forEach((linkName) => {
        let path = [];
        path.push(start.name);
        path.push(linkName);
        paths.push(path);
    });

    let foundMore = false;
    do {
        foundMore = false;
        paths.forEach((path) => {
            let options = getValidLinksFunction(caves, path);
            // console.log('options :>> ', options);
            if (options.length > 1) {
                for (let i = 1; i < options.length; i++) {
                    paths.push([...path, options[i]]);
                }
            }
            if (options.length > 0) {
                foundMore = true;
                path.push(options[0]);
            } else {
                // console.log('DEAD END');
            }
        });
    } while (foundMore);

    paths = paths.filter((path) => path[path.length - 1] == 'end');
    paths = paths.map((path) => {
        return path.join(',');
    });

    return paths;
}

function getAllValidLinks(caves, path) {
    let startLinkName = path[path.length - 1];
    let cave = caves[startLinkName];
    let options = [];
    cave.links.forEach((linkName) => {
        let link = caves[linkName];
        if ((link.isLarge || !path.includes(linkName)) && startLinkName != 'end') {
            options.push(linkName);
        }
    });
    return options;
}

function getAllValidLinksPart2(caves, path) {
    let startLinkName = path[path.length - 1];
    let startLink = caves[startLinkName];
    let options = [];
    startLink.links.forEach((linkName) => {
        let link = caves[linkName];
        let pathIsValid = isValidLinkPart2(caves, startLink, link, path);
        // console.log('pathIsValid :>> ', pathIsValid);
        if (pathIsValid) {
            options.push(linkName);
        }
    });
    return options;
}

function isValidLinkPart2(caves, startLink, link, path) {
    if (startLink.name == 'end') return false;
    if (link.name == 'start') return false;
    if (link.isLarge) return true;

    //allow 1 small cave to be used twice, but no other

    // if (path.includes(link.name)) return false;
    if (!path.includes(link.name) || !hasDuplicateSmallPath(caves, path)) return true;
    return false;
}

function hasDuplicateSmallPath(caves, path) {
    let duplicate = false;
    let caveCount = {};
    for (let i = 0; i < path.length; i++) {
        let linkName = path[i];
        let link = caves[linkName];
        if (!link.isLarge && linkName != 'start' && linkName != 'end') {
            if (!(linkName in caveCount)) caveCount[linkName] = 0;
            caveCount[linkName]++;
            if (caveCount[linkName] > 1) {
                duplicate = true;
                break;
            }
        }
    }
    return duplicate;
}

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    const test1 = [
        ['start', 'A'],
        ['start', 'b'],
        ['A', 'c'],
        ['A', 'b'],
        ['b', 'd'],
        ['A', 'end'],
        ['b', 'end']
    ];

    const test2 = [
        ['dc', 'end'],
        ['HN', 'start'],
        ['start', 'kj'],
        ['dc', 'start'],
        ['dc', 'HN'],
        ['LN', 'dc'],
        ['HN', 'end'],
        ['kj', 'sa'],
        ['kj', 'HN'],
        ['kj', 'dc']
    ];

    const test3 = [
        ['fs', 'end'],
        ['he', 'DX'],
        ['fs', 'he'],
        ['start', 'DX'],
        ['pj', 'DX'],
        ['end', 'zg'],
        ['zg', 'sl'],
        ['zg', 'pj'],
        ['pj', 'he'],
        ['RW', 'he'],
        ['fs', 'DX'],
        ['pj', 'RW'],
        ['zg', 'RW'],
        ['start', 'pj'],
        ['he', 'WI'],
        ['zg', 'he'],
        ['pj', 'fs'],
        ['start', 'RW']
    ];

    /**
     * Part1
     */

    //setup structure for Cave Information

    // let cavesTest1 = test1.convertToCaves();
    // console.log('cavesTest1 :>> ');
    // cavesTest1.log();
    // console.log('cavesTest1 :>> ', cavesTest1);
    // let pathsTest1 = findPaths(cavesTest1);
    // console.log('pathsTest1 :>> ', pathsTest1);

    // let cavesTest2 = test2.convertToCaves();
    // console.log('cavesTest2 :>> ');
    // cavesTest2.log();
    // let pathsTest2 = findPaths(cavesTest2);
    // console.log('pathsTest2 :>> ', pathsTest2, pathsTest2.length);

    // let cavesTest3 = test3.convertToCaves();
    // console.log('cavesTest3 :>> ');
    // cavesTest3.log();
    // let pathsTest3 = findPaths(cavesTest3);
    // console.log('pathsTest3 :>> ', pathsTest3, pathsTest3.length);

    let cavesInput = input.convertToCaves();
    console.log('cavesInput :>> ');
    cavesInput.log();
    let pathsInput = findPaths(cavesInput, getAllValidLinks);
    // console.log('pathsInput :>> ', pathsInput);
    part1 = pathsInput.length;

    /**
     * Part2
     */

    // let cavesTest1 = test1.convertToCaves();
    // console.log('cavesTest1 :>> ');
    // cavesTest1.log();
    // // console.log('cavesTest1 :>> ', cavesTest1);
    // let pathsTest1Part2 = findPaths(cavesTest1, getAllValidLinksPart2);
    // console.log('pathsTest1Part2 :>> ', pathsTest1Part2, pathsTest1Part2.length);

    // let cavesTest2 = test2.convertToCaves();
    // console.log('cavesTest2 :>> ');
    // cavesTest2.log();
    // let pathsTest2 = findPaths(cavesTest2);
    // console.log('pathsTest2 :>> ', pathsTest2, pathsTest2.length);

    // let cavesTest3 = test3.convertToCaves();
    // console.log('cavesTest3 :>> ');
    // cavesTest3.log();
    // let pathsTest3 = findPaths(cavesTest3);
    // console.log('pathsTest3 :>> ', pathsTest3, pathsTest3.length);

    let pathsInputPart2 = findPaths(cavesInput, getAllValidLinksPart2);
    console.log('pathsInputPart2 :>> ', pathsInputPart2);
    part2 = pathsInputPart2.length;

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //4707
    console.log('Part 2:', part2); //130493
}

setup();
