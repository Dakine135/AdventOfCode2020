const https = require('https');
const fs = require('fs');

Object.defineProperty(Object.prototype, 'map', {
    enumerable: false,
    value: function (callback) {
        return Object.assign(
            {},
            Object.fromEntries(
                Object.entries(this).map(([key, value]) => {
                    return [key, callback(key, value)];
                })
            )
        );
    }
});

Object.defineProperty(Object.prototype, 'forEach', {
    enumerable: false,
    value: function (callback) {
        Object.entries(this).forEach(([key, value]) => callback(key, value));
    }
});

module.exports = {
    async getInput({
        baseUrl = 'adventofcode.com',
        year,
        day,
        inputFilePath = './input.txt',
        ignoreFile = false,
        sessionCookie = 'session=53616c7465645f5ff545fe7bfdc02140dd13c3ce3568e5b22a75f9bf50f8a2f65ecd7eb1fd30a59c70e3be2b58167df2eb5caee0f07ef45e094ca6c6093dd2cb'
    } = {}) {
        if (year == null || day == null) throw Error('year and day required input for getInput');
        const thisPuzzleUrlInput = `/${year}/day/${day}/input`;
        let input = '';

        return new Promise((resolve, reject) => {
            if (ignoreFile || !fs.existsSync(inputFilePath)) {
                console.log('input file does not exist, http get and create');
                const options = {
                    hostname: baseUrl,
                    port: 443,
                    path: thisPuzzleUrlInput,
                    method: 'GET',
                    headers: { Cookie: sessionCookie }
                };

                const req = https.request(options, (res) => {
                    console.log(`statusCode: ${res.statusCode}`);

                    res.on('data', (d) => {
                        if (d && d != null && d.length > 0) input += d;
                        // process.stdout.write(d);
                    });

                    res.on('end', () => {
                        console.log('input :>> ', input);
                        fs.writeFileSync(inputFilePath, input);
                        resolve(input);
                    });
                });

                req.on('error', (error) => {
                    console.error(error);
                    reject(error);
                });

                req.write;
                req.end();
            } else {
                console.log('input file does exist, read');
                let inputFileRaw = fs.readFileSync(inputFilePath);
                resolve(inputFileRaw.toString('utf-8'));
            }
        });
    },
    async parseInput({
        rawInput,
        ignoreFile = false,
        inputFilePath = './input.json',
        parseFunction = (text) => {
            console.log('Need to Supply parse Function to parseInput');
            return text.split('\n');
        }
    }) {
        let input;
        return new Promise((resolve, reject) => {
            if (ignoreFile || !fs.existsSync(inputFilePath)) {
                console.log('creating new Parse File');
                input = parseFunction(rawInput);
                let dataToWrite = JSON.stringify(input, null, 1);
                fs.writeFileSync(inputFilePath, dataToWrite);
                resolve(input);
            } else {
                console.log('Using saved JSON');
                let inputFileRaw = fs.readFileSync(inputFilePath);
                input = JSON.parse(inputFileRaw);
                resolve(input);
            }
        });
    },
    getNanoSecTime() {
        var hrTime = process.hrtime();
        return hrTime[0] * 1000000000 + hrTime[1];
    },
    binarySearch(array, searchValue, lowIndex = 0, highIndex = array.length - 1) {
        console.log('array,searchValue,lowIndex,highIndex :>> ', array, searchValue, lowIndex, highIndex);
    }
};
