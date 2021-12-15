/*
--- Day 4: Giant Squid ---

You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?

--- Part Two ---

On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be?

*/

'use strict';

const Utilities = require('../../Utilities/Utilities');

async function setup() {
    const config = {
        year: 2021,
        day: 4
        // ignoreFile: true,
    };
    let rawInput = await Utilities.getInput(config);
    // console.log("rawInput :>> ", rawInput);

    const parseConfig = {
        rawInput,
        // ignoreFile: true,
        parseFunction: (text) => {
            let output = text.split('\n');
            let numbers = output[0].split(',').map((x) => parseInt(x));
            let boards = [];
            let board = [];
            output.slice(2).forEach((row) => {
                if (row == '') {
                    boards.push(board);
                    board = [];
                    return;
                }
                let parsedRow = row
                    .split(/ {1,2}/)
                    .filter((x) => x != '')
                    .map((x) => parseInt(x));
                // console.log("parsedRow :>> ", parsedRow);
                board.push(parsedRow);
            });
            output = { numbers, boards };
            return output;
        }
    };
    let input = await Utilities.parseInput(parseConfig);
    // console.log("input :>> ", input);

    main(input);
}

function markBoard(board, number) {
    let foundMatch = false;
    for (let rowIndex = 0; rowIndex < board.length && !foundMatch; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length && !foundMatch; colIndex++) {
            if (number == board[rowIndex][colIndex]) {
                board[rowIndex][colIndex] = -1;
                foundMatch = true;
                break;
            }
        }
    }
}

function markAllBoards(boards, number) {
    boards.forEach((board) => {
        markBoard(board, number);
    });
}

function isBingo(board) {
    //check rows
    let winningRow = null;
    let winningCol = null;
    let isBingoResult = false;
    for (let rowIndex = 0; rowIndex < board.length && !isBingoResult; rowIndex++) {
        if (board[rowIndex].filter((x) => x != -1).length == 0) {
            isBingoResult = true;
            winningRow = rowIndex;
        }
    }
    //check columns
    for (let colIndex = 0; colIndex < board[0].length && !isBingoResult; colIndex++) {
        let pendingWinningCol = true;
        for (let rowIndex = 0; rowIndex < board.length && !isBingoResult; rowIndex++) {
            if (board[rowIndex][colIndex] != -1) {
                pendingWinningCol = false;
                break;
            }
        }
        if (pendingWinningCol) {
            isBingoResult = true;
            winningCol = colIndex;
        }
    }

    return isBingoResult;
}

function checkAllBoards(boards) {
    let winningBoards = [];
    let indexesOfWinningBoards = [];
    for (let i = 0; i < boards.length; i++) {
        if (isBingo(boards[i])) {
            winningBoards.push(boards[i]);
            indexesOfWinningBoards.push(i);
        }
    }
    return { winningBoards, indexesOfWinningBoards };
}

function sumBoardNumbers(board) {
    return board
        .flat()
        .filter((x) => x != -1)
        .reduce((sum, value) => {
            return sum + value;
        }, 0);
}

function printBoards(boards) {
    boards.forEach((board) => {
        console.log(board);
    });
}

function main(input) {
    // console.log("input", input);
    console.log('numbers :>> ', input.numbers);
    let startTime = Utilities.getNanoSecTime();
    let part1 = null;
    let part2 = null;

    // let markedBoards = [...boards];
    let { numbers, boards } = input;
    console.log('numbers.length, boards.length :>> ', numbers.length, boards.length);
    let winningBoard = null;
    let winningNumber = null;
    let losingBoard = null;
    let losingNumber = null;
    for (let index = 0; index < numbers.length; index++) {
        console.log('=========================================');
        const number = numbers[index];
        console.log('Number :>> ', number);
        markAllBoards(boards, number);
        let { winningBoards: boardsThatOne, indexesOfWinningBoards } = checkAllBoards(boards);
        if (winningBoard == null && boardsThatOne.length != 0) {
            winningBoard = JSON.parse(JSON.stringify(boardsThatOne[0]));
            winningNumber = number;
            // break;
        }
        if (indexesOfWinningBoards.length > 0) {
            console.log('Boards Remaining :>> ', boards.length);
            indexesOfWinningBoards.sort((a, b) => {
                return b - a;
            });
            console.log('Found WINNERS :>> ', indexesOfWinningBoards);
            printBoards(boardsThatOne);
            // console.log('Number :>> ', number);
        }

        //all remaining won
        if (boards.length == boardsThatOne.length) {
            losingBoard = JSON.parse(JSON.stringify(boardsThatOne[0]));
            // losingBoard = JSON.parse(JSON.stringify(boardsThatOne[boardsThatOne.length - 1]));
            losingNumber = number;
            console.log('=========================================');
            break;
        }

        //removes winners from main list of boards
        indexesOfWinningBoards.forEach((boardIndex) => {
            boards.splice(boardIndex, 1);
        });
        console.log('=========================================');
    }
    console.log('winningNumber :>> ', winningNumber);
    console.log('winningBoard :>> ', winningBoard);
    console.log('losingNumber :>> ', losingNumber);
    console.log('losingBoard :>> ', losingBoard);
    // console.log('boards :>> ', boards);

    let sumBoardWinner = sumBoardNumbers(winningBoard);
    let sumBoardLooser = sumBoardNumbers(losingBoard);
    part1 = sumBoardWinner * winningNumber;
    part2 = sumBoardLooser * losingNumber;
    console.log(`Winner: ${sumBoardWinner} * ${winningNumber} = ${part1}`);
    console.log(`Looser: ${sumBoardLooser} * ${losingNumber} = ${part2}`);

    let endTime = Utilities.getNanoSecTime();
    let timeElapsed = (endTime - startTime) * 0.000001;
    console.log('timeElapsed:', timeElapsed);

    console.log('Part 1:', part1); //45031
    console.log('Part 2:', part2); //10373 too high, 20295 too high, not 11247
    //part 2 answer was 2568
}

setup();
