var WebSocket = require("ws");

function websocketServer(server) {
  const wss = new WebSocket.Server({ server: server });

  var SYSTEM_SATUS = off;
  wss.on("connection", function connection(ws, request, client) {
    console.log("A new Camera has been anounced");
    console.log(wss.clients);
    ws.send("Welcome New Client");
    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });
  });
}

module.exports = websocketServer;