/*
--- Day 2: Password Philosophy ---

Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?

--- Part Two ---

While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

    1-3 a: abcde is valid: position 1 contains a and position 3 does not.
    1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
    2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

How many passwords are valid according to the new interpretation of the policies?


Answers:
Part1: 560
Part2: 303

*/

"use strict";
const https = require("https");
const fs = require("fs");

const baseUrl = "adventofcode.com";
const year = 2020;
const day = 2;
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
      input = input.map((text) => {
        let lineSplit = text.split(" ");
        let countRange = lineSplit[0].split("-");
        let min = parseInt(countRange[0], 10);
        let max = parseInt(countRange[1], 10);
        let letter = lineSplit[1][0];
        let password = lineSplit[2];
        let output = { password: password, letter: letter, min: min, max: max };
        return output;
      });
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

function getCountOfEachLetter(string) {
  let output = {};
  string.split("").forEach((letter) => {
    if (!output[letter]) output[letter] = 1;
    else output[letter] += 1;
  });
  return output;
}

function main(input) {
  // console.log("input", input);
  let startTime = getNanoSecTime();

  //for each password in input
  let countValidPart1 = 0;
  let countValidPart2 = 0;
  input.map((passwordObj) => {
    passwordObj.letterCounts = getCountOfEachLetter(passwordObj.password);
    let countOfLetter = passwordObj.letterCounts[passwordObj.letter]
      ? passwordObj.letterCounts[passwordObj.letter]
      : 0;
    passwordObj.validPart1 =
      countOfLetter <= passwordObj.max && countOfLetter >= passwordObj.min;

    let countValidPositions = 0;
    if (passwordObj.password[passwordObj.min - 1] == passwordObj.letter)
      countValidPositions++;
    if (passwordObj.password[passwordObj.max - 1] == passwordObj.letter)
      countValidPositions++;
    passwordObj.validPart2 = countValidPositions == 1;

    if (passwordObj.validPart1) countValidPart1++;
    if (passwordObj.validPart2) countValidPart2++;
  });

  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  console.log("Input", input);
  let total = input.length;
  console.log("Total:", total);
  console.log("Count Valid Part 1:", countValidPart1);
  // console.log("Count Invalid Part 1:", total - countValidPart1);
  console.log("Count Valid Part 2:", countValidPart2);
  // console.log("Count Invalid Part 2:", total - countValidPart2);
}
