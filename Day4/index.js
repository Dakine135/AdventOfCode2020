/*
--- Day 4: Passport Processing ---

You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)

Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

Here is an example batch file containing four passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in

The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

Your puzzle answer was 242.

--- Part Two ---

The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.

Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789

Here are some invalid passports:

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

Here are some valid passports:

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?

Answers:
Part1: 242
Part2: 186

*/

"use strict";
const https = require("https");
const fs = require("fs");

const baseUrl = "adventofcode.com";
const year = 2020;
const day = 4;
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
      let passports = [];
      input = input.split("\n");
      let newPassport = {};
      input.forEach((row) => {
        if (row == "") {
          passports.push(newPassport);
          newPassport = {};
        } else {
          let fields = row.split(" ");
          fields.forEach((field) => {
            let split = field.split(":");
            newPassport[split[0]] = split[1];
          });
        }
      });
      // console.log("Passports:", passports);
      let dataToWrite = JSON.stringify(passports);
      fs.writeFileSync(inputFilePath, dataToWrite);
      main(passports);
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
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
      If cm, the number must be at least 150 and at most 193.
      If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid (Country ID) - ignored, missing or not.
*/
function isValidPassport(passport, template) {
  let passportIsValidSimple = true;
  let passportIsValidFull = true;
  let fieldsInTemplate = Object.keys(template);
  fieldsInTemplate.some((field) => {
    if (template[field].required && !passport[field]) {
      passportIsValidSimple = false;
      passportIsValidFull = false;
      return true;
    }
    if (
      template[field].required &&
      passport[field] &&
      !template[field].isValid(passport[field])
    ) {
      passportIsValidFull = false;
      return true;
    }
  });
  return { part1: passportIsValidSimple, part2: passportIsValidFull };
}

function main(input) {
  // console.log("input", input);
  let startTime = getNanoSecTime();

  let passportTemplate = {
    byr: {
      required: true,
      length: 4,
      min: 1920,
      max: 2002,
      isValid: function (value) {
        if (value.length != this.length) return false;
        let int = parseInt(value, 10);
        if (typeof int != "number" || int == NaN) return false;
        if (int < this.min || int > this.max) return false;
        return true;
      },
    },
    iyr: {
      required: true,
      length: 4,
      min: 2010,
      max: 2020,
      isValid: function (value) {
        if (value.length != this.length) return false;
        let int = parseInt(value, 10);
        if (typeof int != "number" || int == NaN) return false;
        if (int < this.min || int > this.max) return false;
        return true;
      },
    },
    eyr: {
      required: true,
      length: 4,
      min: 2020,
      max: 2030,
      isValid: function (value) {
        if (value.length != this.length) return false;
        let int = parseInt(value, 10);
        if (typeof int != "number" || int == NaN) return false;
        if (int < this.min || int > this.max) return false;
        return true;
      },
    },
    hgt: {
      required: true,
      cm: { regex: "^[0-9]{3,3}cm$", min: 150, max: 193 },
      in: { regex: "^[0-9]{2,2}in$", min: 59, max: 76 },
      isValid: function (value) {
        let isTypeCm = value.match(this.cm.regex) ? true : false;
        let isTypeIn = value.match(this.in.regex) ? true : false;
        console.log("value", value, " => cm:", isTypeCm, "in:", isTypeIn);
        if ((isTypeCm && isTypeIn) || (!isTypeCm && !isTypeIn)) return false;
        if (isTypeCm) {
          let int = parseInt(value.substring(0, 3));
          if (typeof int != "number" || int == NaN) return false;
          if (int < this.cm.min || int > this.cm.max) return false;
        }
        if (isTypeIn) {
          let int = parseInt(value.substring(0, 2));
          if (typeof int != "number" || int == NaN) return false;
          if (int < this.in.min || int > this.in.max) return false;
        }
        return true;
      },
    },
    hcl: {
      required: true,
      regex: "^#[0-9a-f]{6,6}$",
      isValid: function (value) {
        return value.match(this.regex);
      },
    },
    ecl: {
      required: true,
      options: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
      isValid: function (value) {
        return this.options.includes(value);
      },
    },
    pid: {
      required: true,
      regex: "^[0-9]{9,9}$",
      isValid: function (value) {
        return value.match(this.regex);
      },
    },
    cid: {
      required: false,
      isValid: function (value) {
        return true;
      },
    },
  };

  let validCountPart1 = 0;
  let validCountPart2 = 0;
  input.forEach((passport) => {
    let { part1, part2 } = isValidPassport(passport, passportTemplate);
    if (part1) validCountPart1++;
    if (part2) validCountPart2++;
  });

  let endTime = getNanoSecTime();
  let timeElapsed = (endTime - startTime) * 0.000001;
  console.log("timeElapsed:", timeElapsed);

  console.log("Valid Count Part 1:", validCountPart1);
  console.log("Valid Count Part 2:", validCountPart2);
}
