/*
--- Day 2: Dive! ---

Now, you need to figure out how to pilot this thing.

It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:

    forward X increases the horizontal position by X units.
    down X increases the depth by X units.
    up X decreases the depth by X units.

Note that since you're on a submarine, down and up affect your depth, and so they have the opposite result of what you might expect.

The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:

forward 5
down 5
forward 8
up 3
down 8
forward 2

Your horizontal position and depth both start at 0. The steps above would then modify them as follows:

    forward 5 adds 5 to your horizontal position, a total of 5.
    down 5 adds 5 to your depth, resulting in a value of 5.
    forward 8 adds 8 to your horizontal position, a total of 13.
    up 3 decreases your depth by 3, resulting in a value of 2.
    down 8 adds 8 to your depth, resulting in a value of 10.
    forward 2 adds 2 to your horizontal position, a total of 15.

After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)

Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?

--- Part Two ---

Based on your calculations, the planned course doesn't seem to make any sense. You find the submarine manual and discover that the process is actually slightly more complicated.

In addition to horizontal position and depth, you'll also need to track a third value, aim, which also starts at 0. The commands also mean something entirely different than you first thought:

    down X increases your aim by X units.
    up X decreases your aim by X units.
    forward X does two things:
        It increases your horizontal position by X units.
        It increases your depth by your aim multiplied by X.

Again note that since you're on a submarine, down and up do the opposite of what you might expect: "down" means aiming in the positive direction.

Now, the above example does something different:

    forward 5 adds 5 to your horizontal position, a total of 5. Because your aim is 0, your depth does not change.
    down 5 adds 5 to your aim, resulting in a value of 5.
    forward 8 adds 8 to your horizontal position, a total of 13. Because your aim is 5, your depth increases by 8*5=40.
    up 3 decreases your aim by 3, resulting in a value of 2.
    down 8 adds 8 to your aim, resulting in a value of 10.
    forward 2 adds 2 to your horizontal position, a total of 15. Because your aim is 10, your depth increases by 2*10=20 to a total of 60.

After following these new instructions, you would have a horizontal position of 15 and a depth of 60. (Multiplying these produces 900.)

Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?


*/

"use strict";

const Utilities = require("../../Utilities/Utilities");

async function setup() {
  const config = {
    year: 2021,
    day: 2,
    // ignoreFile: true,
  };
  let rawInput = await Utilities.getInput(config);
  // console.log("rawInput :>> ", rawInput);

  const parseConfig = {
    rawInput,
    // ignoreFile: true,
    parseFunction: (text) => {
      let output = text.split("\n");
      output = output.map((x) => {
        let splitX = x.split(" ");
        return { direction: splitX[0], amount: parseInt(splitX[1]) };
      });
      return output;
    },
  };
  let input = await Utilities.parseInput(parseConfig);
  console.log("input :>> ", input);

  main(input);
}

function main(input) {
  // console.log("input", input);
  let startTime = Utilities.getNanoSecTime();
  let part1 = null;
  let part2 = null;

  let horizontal = 0;
  let depth = 0;
  let depthPart2 = 0;
  let aim = 0;
  input.forEach((entry) => {
    switch (entry.direction) {
      case "forward":
        horizontal += entry.amount;
        depthPart2 += entry.amount * aim;
        break;
      case "up":
        depth -= entry.amount;
        aim -= entry.amount;
        break;
      case "down":
        depth += entry.amount;
        aim += entry.amount;
        break;
      default:
        console.error("unknown direction", entry.direction);
    }
  });
  part1 = horizontal * depth;
  part2 = horizontal * depthPart2;

  let endTime = Utilities.getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

setup();
