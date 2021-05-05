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

	function closedSocket() {
		console.log("disconnected from " + mac);
            clearInterval(pingInterval);
                updateCameraStatus(mac, false);
            delete sockets[mac];
	}

        ws.on("close", closedSocket);

        ws.on("message", async (message) => {
	console.log(">" + message)
	    if (message == "pong") {
                if (pingResolve) {
                    pingResolve(true);
                    pingResolve = null;
                }
		return;
	    }
            var input = JSON.parse(message);
            if (input.msg == "mac") {
                if (input.mac in sockets) {
                } else {
                    await ws.send("sendSetupImage");
                }
                sockets[input.mac] = ws;
                mac = input.mac;
                console.log(input.mac);

                updateCameraStatus(mac, true);

                if (pingInterval == null) {
		// Start the ping heartbeat
                    pingInterval = setInterval(async () => {
                        await ws.send("ping");
                        const ok = await new Promise(resolve => {
                            pingResolve = resolve;
                            setTimeout(() => {
                                resolve(false);
                            }, 10000);
                        });
                        /* await */ updateCameraStatus(mac, ok);
                        if (!ok) {
				console.log("pong failed")
                            closedSocket();
                        }
                    }, 10000);
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
