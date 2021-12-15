/*
--- Day 5: Binary Boarding ---

You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of FBFBBFFRLR:

    Start by considering the whole range, rows 0 through 127.
    F means to take the lower half, keeping rows 0 through 63.
    B means to take the upper half, keeping rows 32 through 63.
    F means to take the lower half, keeping rows 32 through 47.
    B means to take the upper half, keeping rows 40 through 47.
    B keeps rows 44 through 47.
    F keeps rows 44 through 45.
    The final F keeps the lower of the two, row 44.

The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

For example, consider just the last 3 characters of FBFBBFFRLR:

    Start by considering the whole range, columns 0 through 7.
    R means to take the upper half, keeping columns 4 through 7.
    L means to take the lower half, keeping columns 4 through 5.
    The final R keeps the upper of the two, column 5.

So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

Here are some other boarding passes:

    BFFFBBFRRR: row 70, column 7, seat ID 567.
    FFFBBBFRRR: row 14, column 7, seat ID 119.
    BBFFBBFRLL: row 102, column 4, seat ID 820.

As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?

Your puzzle answer was 842.

The first half of this puzzle is complete! It provides one gold star: *
--- Part Two ---

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?

Answers:
Part1: 842
Part2: 617

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
      input = input.filter((text) => {
        return text && text.length > 0 && text != "" && text != " ";
      });
      // input.forEach((row) => {});
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

/*
  binary space partitioning
  BFFFBBFRRR: row 70, column 7, seat ID 567.
  FFFBBBFRRR: row 14, column 7, seat ID 119.
  BBFFBBFRLL: row 102, column 4, seat ID 820
*/
function findSeat(seatCode, plane) {
  // console.log("SEAT CODE:", seatCode);
  let columnMax = plane.columns - 1;
  let columnMin = 0;
  let rowMax = plane.rows - 1;
  let rowMin = 0;
  //TODO Diff is one off
  let columnDiff = columnMax - columnMin + 1;
  let rowDiff = rowMax - rowMin + 1;
  // console.log("Before ROW:", rowMin, rowMax, rowDiff);
  // console.log("Before Column:", columnMin, columnMax, columnDiff);
  seatCode.split("").forEach((char, index) => {
    // console.log(
    //   "Character:",
    //   seatCode.substring(0, index),
    //   char,
    //   seatCode.substring(index + 1)
    // );

    switch (char) {
      case "F":
        rowMax = rowMax - Math.ceil(rowDiff / 2);
        rowDiff = rowMax - rowMin;
        // console.log("After ROW:", rowMin, rowMax, rowDiff);
        break;
      case "B":
        rowMin = rowMin + Math.ceil(rowDiff / 2);
        rowDiff = rowMax - rowMin;
        // console.log("After ROW:", rowMin, rowMax, rowDiff);
        break;
      case "L":
        columnMax = columnMax - Math.ceil(columnDiff / 2);
        columnDiff = columnMax - columnMin;
        // console.log("After Column:", columnMin, columnMax, columnDiff);
        break;
      case "R":
        columnMin = columnMin + Math.ceil(columnDiff / 2);
        columnDiff = columnMax - columnMin;
        // console.log("After Column:", columnMin, columnMax, columnDiff);
        break;
      default:
        console.log("unknown Character");
    }
  });
  if (rowMin != rowMax) console.log("Row error:", rowMin, rowMax, rowDiff);
  if (columnMin != columnMax)
    console.log("Column error:", columnMin, columnMax, columnDiff);
  let seatId = rowMin * 8 + columnMin;
  return { row: rowMin, column: columnMin, seatId: seatId };
}

function main(input) {
  console.log("input", input);
  let startTime = getNanoSecTime();

  let plane = {
    rows: 128,
    columns: 8,
  };

  let listOfIds = [];
  input.forEach((seatCode) => {
    let seat = findSeat(seatCode, plane);
    listOfIds.push(seat.seatId);
  });
  listOfIds.sort((a, b) => {
    if (a > b) return 1;
    return -1;
  });
  let indexOfLast = listOfIds.length - 1;
  let highestId = listOfIds[indexOfLast];
  console.log(listOfIds);

  let previousId = listOfIds[0] - 1;
  let myId;
  listOfIds.some((id) => {
    if (id - 1 != previousId) myId = id - 1;
    previousId = id;
  });

  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  console.log("Highest Seat ID:", highestId);
  console.log("My Seat ID:", myId);
}
