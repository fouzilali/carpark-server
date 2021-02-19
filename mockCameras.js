var got = require("got");

/**
 * Async Promise verion of sleep
 *
 * @param {int} ms how long to sleep ofr
 */
const sleep = ms => new Promise(res => setTimeout(res, ms));

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randBool() {
    return Math.random() > 0.5;
}
function randIndex(arr) {
    return randInt(0, arr.length - 1);
}
function randChoose(arr) {
    return arr[randIndex(arr)];
}

/**
 * Generate a random LP number
 */
function randomLP() {
    let characters = "ABCDEFGHJKLMNPRSTUVWXYZ";
    let a = randChoose(characters);
    let b = randChoose(characters);
    let n = randInt(100, 9999);

    return "" + a + b + n;
}

async function mockOperations(serveraddr = "http://localhost:3000") {
    let lps = [];
    let cameras = Array.from({ length: 1 }, () => randInt(0, 2 ** 12));
    const server = got.extend({ prefixUrl: serveraddr });

    if (0) {
        // Initialize some spots
        cameras.forEach(cameraID => {
            cameraIDString = cameraID.toString();
            server.post("setup/addParkingSpot", {
                json: {
                    spotID: cameraIDString,
                    cameraID: cameraIDString,
                    boundingBox: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0,
                        x3: 0,
                        y3: 0,
                        x4: 0,
                        y4: 0,
                    },
                },
            });
            server.post("setup/addCamera", {
                json: {
                    cameraID: cameraIDString,
                    parkingSpots: [cameraIDString],
                    isActive: true,
                },
            });
        });
    } else {
        let mac = "";
        let hex = cameraID.toString(16);
        for (let i = 0; i < hex.length; i += 2) {
            mac += hex[i];
            mac += hex[i + 1];
            mac += ":";
        }
        server.post("setup/announceCamera", {
            json: {
                mac: mac,
                isActive: true,
            },
        });
    }

    do {
        await sleep(1000);

        try {
            let cam = randChoose(cameras);
            if (Math.random() < 0.7 || lps.length == 0) {
                // spotFilled
                let lp = randomLP();
                lps.push(lp);
                let req = {
                    cameraID: cam,
                };

                const response = await server
                    .put("operation/spotFilled", {
                        json: req,
                    })
                    .json();
                console.log(response);
            } else {
                // spotVacated
                let i = randIndex(lps);
                let lp = lps[i];
                lps.splice(i);

                let req = {
                    cameraID: cam,
                    spotID: cam, // Temp
                    licensePlate: lp,
                };

                const response = await server
                    .put("operation/spotVacated", {
                        json: req,
                    })
                    .json();
                console.log(response);
            }
        } catch (error) {
            console.log(error.response.body);
        }
    } while (false);
}

module.exports = {
    randomLP: randomLP,
    mockOperations: mockOperations,
};

mockOperations();
