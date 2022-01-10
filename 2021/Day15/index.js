/*
--- Day 15: Chiton ---

You've almost reached the exit of the cave, but the walls are getting closer together. Your submarine can barely still fit, though; the main problem is that the walls of the cave are covered in chitons, and it would be best not to bump any of them.

The cavern is large, but has a very low ceiling, restricting your motion to two dimensions. The shape of the cavern resembles a square; a quick scan of chiton density produces a map of risk level throughout the cave (your puzzle input). For example:

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581

You start in the top left position, your destination is the bottom right position, and you cannot move diagonally. The number at each position is its risk level; to determine the total risk of an entire path, add up the risk levels of each position you enter (that is, don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total).

Your goal is to find a path with the lowest total risk. In this example, a path with the lowest total risk is highlighted here:

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581

The total risk of this path is 40 (the starting position is never entered, so its risk is not counted).

What is the lowest total risk of any path from the top left to the bottom right?


*/

'use strict';

const Utilities = require('../../Utilities/Utilities');
const DEBUG = true;

async function setup() {
    const config = {
        year: 2021,
        day: 15
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
            output = output.map((x, indexRow) => {
                let splitString = x.split('');
                return splitString.map((string, indexColumn) => {
                    return {
                        x: indexColumn,
                        y: indexRow,
                        risk: parseInt(string),
                        totalRisk: null
                    };
                });
            });
            console.log('output :>> ', output);
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

class Map {
    constructor(input) {
        this.map = input;
        this.toDo = [];
        this.setup();
    }

    setup() {
        this.map = this.map.map((row, indexRow) => {
            return row.map((entry, indexColumn) => {
                entry.totalRisk = Infinity;
                if (indexRow == 0 && indexColumn == 0) {
                    entry.totalRisk = 0;
                    entry.path = [entry];
                } else {
                    entry.path = [];
                }
                return entry;
            });
        });
        this.toDo.push(this.map[0][1], this.map[1][0]);
    }

    calculateTotalRisk() {
        let iterationLimit = 10000000;
        let iterationCount = 0;
        // console.log('this.toDo :>> ', this.toDo);
        let currentEntry;
        while (this.toDo.length > 0) {
            iterationCount++;
            if (iterationCount >= iterationLimit) {
                console.log('Iteration Limit');
                break;
            }
            currentEntry = this.toDo.pop();
            this.updateEntryRisk(currentEntry);
            // this.log();
        }
    }

    getNeighbors(entry) {
        let neighbors = [];
        if (this.map[entry.x - 1]?.[entry.y] != null) neighbors.push(this.map[entry.x - 1][entry.y]);
        if (this.map[entry.x + 1]?.[entry.y] != null) neighbors.push(this.map[entry.x + 1][entry.y]);
        if (this.map[entry.x]?.[entry.y - 1] != null) neighbors.push(this.map[entry.x][entry.y - 1]);
        if (this.map[entry.x]?.[entry.y + 1] != null) neighbors.push(this.map[entry.x][entry.y + 1]);
        return neighbors;
    }

    updateEntryRisk(entry) {
        let neighbors = this.getNeighbors(entry);
        let originalTotalRisk = entry.totalRisk;
        // console.log('neighbors :>> ', neighbors);
        let leastRiskRouteToMe = Math.min(...neighbors.map((x) => x.totalRisk));
        // console.log('leastRiskRouteToMe :>> ', leastRiskRouteToMe);
        let newTotalRisk = leastRiskRouteToMe + entry.risk;
        if (newTotalRisk < originalTotalRisk) {
            entry.totalRisk = newTotalRisk;
            neighbors.forEach((neighbor) => {
                this.toDo.unshift(neighbor);
            });
        }
        // console.log('entry :>> ', entry);
    }

    getEndPosition() {
        let lastRow = this.map[this.map.length - 1];
        return lastRow[lastRow.length - 1];
    }

    log() {
        this.map.forEach((row, index) => {
            // row.forEach((entry, indexColumn) => {
            // });
            let rowString = row.map((entry) => {
                switch (entry.totalRisk != null ? entry.totalRisk.toString().length : null) {
                    case 1:
                        return `00${entry.totalRisk}`;
                    case 2:
                        return `0${entry.totalRisk}`;
                    case 3:
                        return `${entry.totalRisk}`;
                    case null:
                        return `nul`;
                    case 8:
                        return `Inf`;
                    default:
                        return `000`;
                }
            });
            console.log(rowString.join('-'));
        });
    }
}

function parseFunction(text) {
    text = text.trim();
    let output = text.split('\n');
    output = output.map((x, indexRow) => {
        let splitString = x.split('');
        // console.log('splitString :>> ', splitString);
        return splitString.map((string, indexColumn) => {
            return {
                x: indexColumn,
                y: indexRow,
                risk: parseInt(string),
                totalRisk: null
            };
        });
    });
    // console.log('output :>> ', output);
    return output;
}

function main(input) {
    // console.log("input", input);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    //test input
    let inputTestString = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

    // console.log('inputTestString :>> ', inputTestString);
    let testInput = parseFunction(inputTestString);
    // console.log('testInput :>> ', testInput);
    let testMap = new Map(testInput);
    testMap.log();
    testMap.calculateTotalRisk();
    console.log('AFTER calculateTotalRisk');
    testMap.log();
    let testResult = testMap.getEndPosition().totalRisk;
    console.log('testResult :>> ', testResult);

    // let map = new Map(input);
    // map.log();
    // map.calculateTotalRisk();
    // console.log('AFTER calculateTotalRisk');
    // map.log();
    // part1 = map.getEndPosition().totalRisk;
    // input.forEach((row, indexRow) => {
    //     row.forEach((entry, indexColumn) => {
    //         console.log('entry, indexRow, indexColumn :>> ', entry, indexRow, indexColumn);
    //     });
    // });

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //653 too low
    console.log('Part 2:', part2);
}

setup();
