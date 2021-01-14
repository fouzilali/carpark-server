var got = require('got');

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

function randChoose(arr) {
    return arr[randInt(0, arr.length - 1)];
}

/**
 * Generate a random LP number
 */
function randomLP() {
    let characters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    let a = randChoose(characters);
    let b = randChoose(characters);
    let n = randInt(100, 9999);

    return '' + a + b + n;
}

async function mockOperations(serveraddr = 'localhost:3000') {
    let lps = [];
    let cameras = Array.from({ length: 40 }, () => randInt(0, 1000000));
    const server = got.extend({ prefixUrl: serveraddr });

    while (true) {
        try {
            let cam = randChoose(cameras);
            let req = {
                cameraID: cam,

            };
            if (randBool()) {
                // spotFilled
                let lp = randomLP();
                lps.push(lp);

                req.licensePlate = lp;

                const response = await server.put('spotFilled', {
                    json: req
                })
            } else {
                // spotVacated
                let lp = randChoose(lps);

                const response = await server.put('spotVacated', {
                    json: req
                })
            }

        } catch (error) {

        }

        await sleep(1000);
    }
}

module.exports = {
    "randomLP": randomLP,
    "mockOperations": mockOperations
};