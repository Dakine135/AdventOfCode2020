/*
--- Day 3: Toboggan Trajectory ---

With the toboggan login problems resolved, you set off toward the airport. While travel by toboggan might be easy, it's certainly not safe: there's very minimal steering and the area is covered in trees. You'll need to see which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer coordinates in a grid. You make a map (your puzzle input) of the open squares (.) and trees (#) you can see. For example:

..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#

These aren't the only trees, though; due to something you read about once involving arboreal genetics and biome stability, the same pattern repeats to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->

You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); start by counting all the trees you would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O where there was an open square and X where there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->

In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

Your puzzle answer was 244.

The first half of this puzzle is complete! It provides one gold star: *
--- Part Two ---

Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

    Right 1, down 1.
    Right 3, down 1. (This is the slope you already checked.)
    Right 5, down 1.
    Right 7, down 1.
    Right 1, down 2.

In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?


Answers:
Part1: 244
Part2: 303

*/

"use strict";
const https = require("https");
const fs = require("fs");

const baseUrl = "adventofcode.com";
const year = 2020;
const day = 3;
const thisPuzzleUrlInput = `/${year}/day/${day}/input`;

const inputFilePath = "./input.json";

var input = [];

if (!fs.existsSync(inputFilePath)) {
  console.log("input file does not exist, http get and create");
  const options = {
    hostname: baseUrl,
    port: 443,
    path: thisPuzzleUrlInput,
    method: "GET",
    headers: {
      Cookie:
        "_ga=GA1.2.1475633945.1606841364; _gid=GA1.2.58165350.1606841364; session=53616c7465645f5fca04fc5fedc22a599f93a1be79369f63f5b2d194c3976759f411a284baaa13d41232b8e89cc15c56",
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      if (d && d != null && d.length > 0) input += d;
      process.stdout.write(d);
    });

    res.on("end", () => {
      input = input.split("\n");
      input = input.filter((text) => {
        return text && text.length > 0 && text != "" && text != " ";
      });
      // input = input.map((text) => {

      //   return output;
      // });
      let dataToWrite = JSON.stringify(input);
      console.log(input);
      fs.writeFileSync(inputFilePath, dataToWrite);
      main(input);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write;
  req.end();
} else {
  console.log("input file does exist, parse");
  let inputFileRaw = fs.readFileSync(inputFilePath);
  input = JSON.parse(inputFileRaw);
  main(input);
}

function getNanoSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1];
}

function move(input, currPos, { x, y }) {
  let newPos = { x: currPos.x + x, y: currPos.y + y };
  let hasNext = newPos.y + y < input.length;
  let row = input[newPos.y];
  let charIndex = newPos.x % row.length;
  let char = row[charIndex];
  let isTree = char == "#";
  // let replaceChar = isTree ? "X" : "O";
  // input[newPos.y] =
  //   row.substring(0, charIndex) + replaceChar + row.substring(charIndex + 1);
  // console.log(input[newPos.y]);
  let output = {
    output: input,
    currPos: newPos,
    isTree: isTree,
    hasNext: hasNext,
  };
  return output;
}

function getTreeCount(input, startPos, { x, y }) {
  // let inputCopy = JSON.parse(JSON.stringify(input));
  let { output, currPos, isTree, hasNext } = move(input, startPos, {
    x: x,
    y: y,
  });
  // console.log("move output:", currPos, isTree, hasNext);
  let treeCount = isTree ? 1 : 0;
  while (hasNext) {
    ({ output, currPos, isTree, hasNext } = move(output, currPos, {
      x: x,
      y: y,
    }));
    if (isTree) treeCount++;
    // console.log("move output:", currPos, isTree, hasNext);
  }
  return treeCount;
}

function main(input) {
  // console.log("input", input);
  let startTime = getNanoSecTime();

  let startPos = { x: 0, y: 0 };
  let part1Move = { x: 3, y: 1 };

  let treeCountPart1 = getTreeCount(input, startPos, part1Move);
  console.log("Tree Count Part 1:", treeCountPart1);

  let movesPart2 = [
    { x: 1, y: 1 },
    part1Move,
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  movesPart2.map((move) => {
    move.treeCount = getTreeCount(input, startPos, move);
  });

  let reducerMultiply = (total, move) => {
    return total * move.treeCount;
  };

  let movesPart2Multiplied = movesPart2.reduce(reducerMultiply, 1);

  console.log("moves Part 2:", movesPart2);
  console.log("movesPart2Multiplied:", movesPart2Multiplied);

  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  // console.log("Input", input);
}
