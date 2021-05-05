var WebSocket = require("ws");
var { updateCameraStatus } = require("./routes/setup_page");

let wss = null;
var sockets = {};
function websocketServer(server) {
    wss = new WebSocket.Server({ server: server });
    //False => incomplete
    //True => complete
    var states = {
        cameraIDsetup: false,
        parkingSpotSetup: false,
        operation: false,
    };
    wss.on("connection", function connection(ws, request, client) {
        console.log("A new camera has been detected");
        ws.send("Welcome New Client");

        let pingResolve = null;
        let pingInterval = null;

        let mac = null;

        ws.on("close", function closedSocket() {
            clearInterval(pingInterval);
            delete sockets[mac];
        });

        ws.on("message", function incoming(message) {
            var input = JSON.parse(message);
            if (input.msg == "mac") {
                if (input.mac in sockets) {
                } else {
                    ws.send("sendSetupImage");
                }
                sockets[input.mac] = ws;
                mac = input.mac;
                console.log(input.mac);

                updateCameraStatus(mac, true);

                // Start the ping heartbeat
                if (pingInterval == null) {
                    pingInterval = setInterval(async () => {
                        ws.send("ping");
                        const ok = await new Promise(resolve => {
                            pingResolve = resolve;
                            setTimeout(() => {
                                resolve(false);
                            });
                        });
                        /* await */ updateCameraStatus(mac, ok);
                        if (!ok) {
                            closed();
                        }
                    }, 10000);
                }
            } else if (input.msg == "pong") {
                if (pingResolve) {
                    pingResolve(true);
                    pingResolve = null;
                }
            }
        });
    });
}

function askSetupImage() {
    wss.clients.forEach(client => client.send("sendSetupImage"));
}

function startAllCameras() {
    wss.clients.forEach(client => client.send("startLPR"));
}

function stopAllCameras() {
    wss.clients.forEach(client => client.send("stopLPR"));
}

module.exports = {
    websocketServer: websocketServer,
    startAllCameras: startAllCameras,
    stopAllCameras: stopAllCameras,
};
