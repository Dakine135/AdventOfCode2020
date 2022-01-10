/*
--- Day 13: Transparent Origami ---

You reach another volcanically active part of the cave. It would be nice if you could do some kind of thermal imaging so you could tell ahead of time which caves are too hot to safely enter.

Fortunately, the submarine seems to be equipped with a thermal camera! When you activate it, you are greeted with:

Congratulations on your purchase! To activate this infrared thermal imaging
camera system, please enter the code found on page 1 of the manual.

Apparently, the Elves have never used this feature. To your surprise, you manage to find the manual; as you go to open it, page 1 falls out. It's a large sheet of transparent paper! The transparent paper is marked with random dots and includes instructions on how to fold it up (your puzzle input). For example:

6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5

The first section is a list of dots on the transparent paper. 0,0 represents the top-left coordinate. The first value, x, increases to the right. The second value, y, increases downward. So, the coordinate 3,0 is to the right of 0,0, and the coordinate 0,7 is below 0,0. The coordinates in this example form the following pattern, where # is a dot on the paper and . is an empty, unmarked position:

...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
...........
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........

Then, there is a list of fold instructions. Each instruction indicates a line on the transparent paper and wants you to fold the paper up (for horizontal y=... lines) or left (for vertical x=... lines). In this example, the first fold instruction is fold along y=7, which designates the line formed by all of the positions where y is 7 (marked here with -):

...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
-----------
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........

Because this is a horizontal line, fold the bottom half up. Some of the dots might end up overlapping after the fold is complete, but dots will never appear exactly on a fold line. The result of doing this fold looks like this:

#.##..#..#.
#...#......
......#...#
#...#......
.#.#..#.###
...........
...........

Now, only 17 dots are visible.

Notice, for example, the two dots in the bottom left corner before the transparent paper is folded; after the fold is complete, those dots appear in the top left corner (at 0,0 and 0,1). Because the paper is transparent, the dot just below them in the result (at 0,3) remains visible, as it can be seen through the transparent paper.

Also notice that some dots can end up overlapping; in this case, the dots merge together and become a single dot.

The second fold instruction is fold along x=5, which indicates this line:

#.##.|#..#.
#...#|.....
.....|#...#
#...#|.....
.#.#.|#.###
.....|.....
.....|.....

Because this is a vertical line, fold left:

#####
#...#
#...#
#...#
#####
.....
.....

The instructions made a square!

The transparent paper is pretty big, so for now, focus on just completing the first fold. After the first fold in the example above, 17 dots are visible - dots that end up overlapping after the fold is completed count as a single dot.

How many dots are visible after completing just the first fold instruction on your transparent paper?

--- Part Two ---

Finish folding the transparent paper according to the instructions. The manual says the code is always eight capital letters.

What code do you use to activate the infrared thermal imaging camera system?


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 13
        // ignoreFile: true
    };
    let rawInput = await Utilities.getInput(config);
    // console.log("rawInput :>> ", rawInput);

    const parseConfig = {
        rawInput,
        // ignoreFile: true,
        parseFunction: (text) => {
            text = text.trim();
            let output = text.split('\n\n');
            let dots = output[0].split('\n');
            let folds = output[1].split('\n');
            dots = dots.map((x) => {
                let pair = x.split(',');
                pair = pair.map((y) => parseInt(y));
                return pair;
            });
            folds = folds.map((fold) => {
                fold = fold.split('=');
                return {
                    dir: fold[0][fold[0].length - 1],
                    amount: parseInt(fold[1])
                };
            });
            output = { dots, folds };
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

Array.prototype.log = function () {
    let indexString = '';
    this.forEach((row, index) => {
        switch (index.toString().length) {
            case 1:
                indexString = `000${index}`;
                break;
            case 2:
                indexString = `00${index}`;
                break;
            case 3:
                indexString = `0${index}`;
                break;
            default:
                indexString = `${index}`;
        }
        console.log(indexString, row.join(''));
    });
};

Array.prototype.countDots = function () {
    let count = 0;
    this.forEach((row, index) => {
        row.forEach((spot) => {
            if (spot == '▮') count++;
        });
    });
    return count;
};

function fold(grid, foldInstruction) {
    console.log('foldInstruction :>> ', foldInstruction);
    //y would indicate a row, x would indicate a column division
    let result = [];
    switch (foldInstruction.dir) {
        case 'y':
            //copy all rows less than fold
            for (let x = 0; x < foldInstruction.amount; x++) {
                result[x] = JSON.parse(JSON.stringify(grid[x]));
            }
            //for rows after fold, move dots, mirror/reflect upward
            for (let x = foldInstruction.amount + 1; x < grid.length; x++) {
                for (let y = 0; y < grid[x].length; y++) {
                    if (grid[x][y] == '▮') {
                        let reflectedX = foldInstruction.amount - Math.abs(x - foldInstruction.amount);
                        let reflectedY = y;
                        // console.log('x,y', x, y, 'reflectedX, reflectedY :>> ', reflectedX, reflectedY, 'amount, diff', foldInstruction.amount, Math.abs(foldInstruction.amount - x));
                        result[reflectedX][reflectedY] = '▮';
                    }
                }
            }
            break;
        case 'x':
            //copy the first part of each row into result
            for (let x = 0; x < grid.length; x++) {
                result[x] = JSON.parse(JSON.stringify(grid[x].slice(0, foldInstruction.amount)));
            }
            //for the other side of the fold on each row, mirror/reflect the dots to the left
            for (let x = 0; x < grid.length; x++) {
                for (let y = foldInstruction.amount + 1; y < grid[x].length; y++) {
                    if (grid[x][y] == '▮') {
                        let reflectedX = x;
                        let reflectedY = foldInstruction.amount - Math.abs(y - foldInstruction.amount);
                        result[reflectedX][reflectedY] = '▮';
                    }
                }
            }
            break;
        default:
            console.error('unknown fold Instruction', foldInstruction);
    }
    return result;
}

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    //test data
    let testDots = [
        [6, 10],
        [0, 14],
        [9, 10],
        [0, 3],
        [10, 4],
        [4, 11],
        [6, 0],
        [6, 12],
        [4, 1],
        [0, 13],
        [10, 12],
        [3, 4],
        [3, 0],
        [8, 4],
        [1, 10],
        [2, 14],
        [8, 10],
        [9, 0]
    ];
    let testFolds = [
        {
            dir: 'y',
            amount: 7
        },
        { dir: 'x', amount: 5 }
    ];

    console.log('testDots :>> ', testDots);
    console.log('testFolds :>> ', testFolds);

    let gridTest = [];
    //get largest referenced Dots
    let largestXTest = 0;
    let largestYTest = 0;
    testDots.forEach((dot) => {
        if (dot[0] > largestYTest) largestYTest = dot[0];
        if (dot[1] > largestXTest) largestXTest = dot[1];
    });
    console.log('largestXTest, largestYTest :>> ', largestXTest, largestYTest);
    //fill with Empty spots
    for (let x = 0; x <= largestXTest; x++) {
        let row = Array(largestYTest + 1).fill('.');
        gridTest.push(row);
    }

    testDots.forEach((dot) => {
        gridTest[dot[1]][dot[0]] = '▮';
    });

    gridTest.log();

    console.log('grid.countDots :>> ', gridTest.countDots());
    gridTest = fold(gridTest, testFolds[0]);
    console.log('grid.countDots :>> ', gridTest.countDots());
    gridTest.log();

    gridTest = fold(gridTest, testFolds[1]);
    console.log('grid.countDots :>> ', gridTest.countDots());
    gridTest.log();

    let { dots, folds } = input;

    let grid = [];
    let largestX = 0;
    let largestY = 0;
    dots.forEach((dot) => {
        if (dot[0] > largestY) largestY = dot[0];
        if (dot[1] > largestX) largestX = dot[1];
    });
    console.log('largestX, largestY :>> ', largestX, largestY);
    for (let x = 0; x <= largestX; x++) {
        let row = Array(largestY).fill('.');
        grid.push(row);
    }

    dots.forEach((dot) => {
        grid[dot[1]][dot[0]] = '▮';
    });

    folds.forEach((instruction, index) => {
        grid = fold(grid, instruction);
        if (part1 == null) part1 = grid.countDots();
        console.log('grid.countDots :>> ', grid.countDots());
        if (index > 4) grid.log();
    });

    // grid.countDots :>>  95
    // 0000 ▮....▮▮▮..▮▮▮▮...▮▮.▮▮▮....▮▮.▮▮▮▮.▮..▮.
    // 0001 ▮....▮..▮.▮.......▮.▮..▮....▮.▮....▮..▮.
    // 0002 ▮....▮..▮.▮▮▮.....▮.▮▮▮.....▮.▮▮▮..▮▮▮▮.
    // 0003 ▮....▮▮▮..▮.......▮.▮..▮....▮.▮....▮..▮.
    // 0004 ▮....▮.▮..▮....▮..▮.▮..▮.▮..▮.▮....▮..▮.
    // 0005 ▮▮▮▮.▮..▮.▮.....▮▮..▮▮▮...▮▮..▮▮▮▮.▮..▮.
    // 0000 ▮▯▯▯▯▮▮▮▯▯▮▮▮▮▯▯▯▮▮▯▮▮▮▯▯▯▯▮▮▯▮▮▮▮▯▮▯▯▮▯
    // 0001 ▮▯▯▯▯▮▯▯▮▯▮▯▯▯▯▯▯▯▮▯▮▯▯▮▯▯▯▯▮▯▮▯▯▯▯▮▯▯▮▯
    // 0002 ▮▯▯▯▯▮▯▯▮▯▮▮▮▯▯▯▯▯▮▯▮▮▮▯▯▯▯▯▮▯▮▮▮▯▯▮▮▮▮▯
    // 0003 ▮▯▯▯▯▮▮▮▯▯▮▯▯▯▯▯▯▯▮▯▮▯▯▮▯▯▯▯▮▯▮▯▯▯▯▮▯▯▮▯
    // 0004 ▮▯▯▯▯▮▯▮▯▯▮▯▯▯▯▮▯▯▮▯▮▯▯▮▯▮▯▯▮▯▮▯▯▯▯▮▯▯▮▯
    // 0005 ▮▮▮▮▯▮▯▯▮▯▮▯▯▯▯▯▮▮▯▯▮▮▮▯▯▯▮▮▯▯▮▮▮▮▯▮▯▯▮▯
    //        9       14       11         9       15       9       14        14   =

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); // not 95, miss read, only 1 fold. 706 correct
    console.log('Part 2:', part2); // LRFJBJEH
}

setup();
