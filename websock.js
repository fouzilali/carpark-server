var WebSocket = require("ws");

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

    ws.on("message", function incoming(message) {
      var input = JSON.parse(message);
      if (input.msg == "mac") {
        sockets[input.mac] = ws;
        console.log(input.mac);
      }
    });
  });
}

function startAllCameras() {
  wss.clients.forEach((client) => client.send("startLPR"));
}

function stopAllCameras() {
  wss.clients.forEach((client) => client.send("stopLPR"));
}

module.exports = {
  websocketServer: websocketServer,
  startAllCameras: startAllCameras,
  stopAllCameras: stopAllCameras,
};
