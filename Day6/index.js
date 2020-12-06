/*
--- Day 6: Custom Customs ---

As your flight approaches the regional airport where you'll switch to a much larger plane, customs declaration forms are distributed to the passengers.

The form asks a series of 26 yes-or-no questions marked a through z. All you need to do is identify the questions for which anyone in your group answers "yes". Since your group is just you, this doesn't take very long.

However, the person sitting next to you seems to be experiencing a language barrier and asks if you can help. For each of the people in their group, you write down the questions for which they answer "yes", one per line. For example:

abcx
abcy
abcz

In this group, there are 6 questions to which anyone answered "yes": a, b, c, x, y, and z. (Duplicate answers to the same question don't count extra; each question counts at most once.)

Another group asks for your help, then another, and eventually you've collected answers from every group on the plane (your puzzle input). Each group's answers are separated by a blank line, and within each group, each person's answers are on a single line. For example:

abc

a
b
c

ab
ac

a
a
a
a

b

This list represents answers from five groups:

    The first group contains one person who answered "yes" to 3 questions: a, b, and c.
    The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
    The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
    The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
    The last group contains one person who answered "yes" to only 1 question, b.

In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.

For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?

Answers:
Part1: 
Part2: 

*/

"use strict";
const https = require("https");
const fs = require("fs");

const baseUrl = "adventofcode.com";
const year = 2020;
const day = 5;
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
      // process.stdout.write(d);
    });

    res.on("end", () => {
      input = input.split("\n");
      input.forEach((row) => {});
      // console.log("Passports:", passports);
      let dataToWrite = JSON.stringify(passports);
      fs.writeFileSync(inputFilePath, dataToWrite);
      // main(input);
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

function main(input) {
  // console.log("input", input);
  let startTime = getNanoSecTime();

  input.forEach((item) => {});

  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);
}
