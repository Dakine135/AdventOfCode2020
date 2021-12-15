/*
--- Day 1: Report Repair ---

After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

To save your vacation, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456

In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?


--- Part Two ---

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?

Github Dakine135
Answer: 
Part 1: 918339
Part 2: 23869440
*/

"use strict";
const https = require("https");
const fs = require("fs");

const baseUrl = "adventofcode.com";
const year = 2020;
const day = 1;
const thisPuzzleUrlInput = `/${year}/day/${day}/input`;

const inputFilePath = "./input.json";

var input = [];
var index = {};
var min = null;
var max = null;

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
      input = input.map((text) => {
        let int = parseInt(text, 10);
        return int;
      });
      input = input.filter((int) => {
        return typeof int === "number" && int != NaN;
      });
      let dataToWrite = JSON.stringify(input);
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

function getCombo(input, goal, count) {
  let output = [];
  input.some((num) => {
    let remaining = goal - num;
    if (remaining > min && count > 2) {
      let comboRemaining = getCombo(input, remaining, count - 1);
      if (comboRemaining.length > 0) {
        output.push(...comboRemaining, num);
        return true;
      }
    } else {
      if (index[remaining]) {
        output.push(num, remaining);
        return true;
      }
    }
  });
  return output;
}

function main(input) {
  console.log("input", input);
  let startTime = getNanoSecTime();

  let goalTotal = 2020;

  //build index
  input.forEach((num) => {
    index[num] = true;
  });
  min = Math.min(...input);
  max = Math.max(...input);

  let numberComboTwo = getCombo(input, goalTotal, 2);

  let numberComboThree = getCombo(input, goalTotal, 3);

  let reducerMultiply = (total, num) => {
    return total * num;
  };

  let numberComboTwoMultiplied = numberComboTwo.reduce(reducerMultiply, 1);
  let numberComboThreeMultiplied = numberComboThree.reduce(reducerMultiply, 1);
  //1,606,845,419,319
  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  console.log("min, max:", min, max);
  console.log("output Part 1:", numberComboTwo, numberComboTwoMultiplied);
  console.log("output Part 2:", numberComboThree, numberComboThreeMultiplied);
}
