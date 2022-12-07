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
        // sessionCookie = 'session=53616c7465645f5f150b0973d7821f4ad7c1f3171c32e498240925d23e6d8e40b19e8caa399e7d72d1ae20668b969223' 2022
        sessionCookie = 'session=53616c7465645f5fe0711f99e93b2191253bb7443daf7a4e6332415b51f950e64dec5ec58308456e46d00e9edf811b8d32e3e89e031103c28c8f169c10f5db23'
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
    }
};
