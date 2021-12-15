/*
--- Day 5: Hydrothermal Venture ---

You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

    An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
    An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.

For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....

In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

--- Part Two ---

Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

    An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
    An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.

Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....

You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 5
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
                let parts = x.split(' -> ');
                // if (parts.length != 2) return;
                let point1 = parts[0].split(',');
                let point2 = parts[1].split(',');
                // if (point1.length != 2 || point2.length != 2) return;
                let x1 = parseInt(point1[0]);
                let y1 = parseInt(point1[1]);
                let x2 = parseInt(point2[0]);
                let y2 = parseInt(point2[1]);
                let line = { x1, y1, x2, y2 };
                return line;
            });
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

function analyzeLine(line) {
    line.isStraight = false;
    line.direction = '';
    line.points = [];
    if (line.x1 == line.x2 && line.y1 != line.y2) {
        line.direction = 'vertical';
        line.isStraight = true;
    } else if (line.x1 != line.x2 && line.y1 == line.y2) {
        line.direction = 'horizontal';
        line.isStraight = true;
    } else if (line.x1 == line.x2 && line.y1 == line.y2) {
        line.direction = 'point';
        line.isStraight = true;
    } else {
        line.isStraight = false;
        line.direction = 'diagonal';
    }

    if (line.isStraight && line.direction == 'vertical') {
        let min = Math.min(line.y1, line.y2);
        let max = Math.max(line.y1, line.y2);
        let diff = max - min;
        for (let i = 0; i <= diff; i++) {
            let point = { x: line.x1, y: min + i };
            line.points.push(point);
        }
    }
    if (line.isStraight && line.direction == 'horizontal') {
        let min = Math.min(line.x1, line.x2);
        let max = Math.max(line.x1, line.x2);
        let diff = max - min;
        for (let i = 0; i <= diff; i++) {
            let point = { x: min + i, y: line.y1 };
            line.points.push(point);
        }
    }
    if (!line.isStraight && line.direction == 'diagonal') {
        let diffX = line.x1 - line.x2;
        let diffY = line.y1 - line.y2;
        let signX = Math.sign(diffX);
        let signY = Math.sign(diffY);
        for (let i = 0; i <= Math.abs(diffX); i++) {
            let point = { x: line.x1 - i * signX, y: line.y1 - i * signY };
            line.points.push(point);
        }
    }

    return line;
}

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    let gridPart1 = {};
    let gridPart2 = {};

    input.forEach((line) => {
        // if (DEBUG) console.log('=========================================');
        analyzeLine(line);
        // console.log('line :>> ', line);
        line.points.forEach((point) => {
            let key = `${point.x},${point.y}`;
            if (line.isStraight) {
                if (!(key in gridPart1)) gridPart1[key] = 0;
                gridPart1[key]++;
            }
            if (!(key in gridPart2)) gridPart2[key] = 0;
            gridPart2[key]++;
        });
        // console.log('direction, isStraight :>> ', direction, isStraight);
        // if (DEBUG) console.log('=========================================');
    });

    // console.log('gridPart1 :>> ', gridPart1);
    part1 = Object.values(gridPart1).filter((x) => x > 1).length;
    part2 = Object.values(gridPart2).filter((x) => x > 1).length;

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //7269
    console.log('Part 2:', part2); //11496 too low.  21140 is correct
}

setup();
