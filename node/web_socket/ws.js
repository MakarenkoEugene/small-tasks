const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Set();

function onSocketConnect(ws, a) {
  console.log(a.headers);
  clients.add(ws);

  ws.on("message", (message) => {
    message = message.slice(0, 50); // максимальный размер сообщения 50

    for (let client of clients) {
      console.log(clients);
      client.send(JSON.stringify({ message, clients }));
    }
  });

  ws.on("close", () => clients.delete(ws));
}

wss.on("connection", onSocketConnect);

// function getWebSocetAccept(webSocketKey) {
//   return crypto
//     .createHash("sha1")
//     .update(webSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
//     .digest("base64");
// }

// http
//   .createServer((req, res) => {
//     // console.log("headers", req.headers);

//     if (req.headers.connection === "Upgrade" && req.headers.upgrade === "websocket") {
//       res.writeHead(101, {
//         Upgrade: "websocket",
//         Connection: "Upgrade",
//         "Sec-WebSocket-Accept": getWebSocetAccept(req.headers["sec-websocket-key"]),
//       });
//       res.end();
//     }

//     res.end("Hello, world!");

//     ws.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
//   })
//   .listen(3000);
