const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const corsOptionsDelegate = function (req, callback) {
  callback(null, {
    origin: [null, "null"].includes(req.header("Origin")),
    method: ["GET", "PUT", "POST"],
  });
};

app.use(cors(corsOptionsDelegate));
app.use(bodyParser());

const Readable = require("stream").Readable;

app.get("/", (req, res) => {
  const stream = new Readable();
  const data = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem architecto voluptatibus nulla placeat neque atque exercitationem, enim vitae itaque suscipit expedita rem esse excepturi ad labore porro earum nostrum?
  Asperiores, recusandae. Quidem sit maiores non officiis repellendus repudiandae ea impedit? Eligendi hic, repellendus accusantium necessitatibus fugit tenetur dignissimos alias eum, ea ipsum aperiam, minima ex? Magnam eius sit autem?
  `.split(
    " "
  );

  res.writeHead(200, { "Content-Type": "text/event-stream", "Content-Length": Uint8Array.from(data.join(" ")).length });

  stream._read = function () {
    if (data.length) {
      setTimeout(() => {
        stream.push(data.shift() + " ");
      }, 20);
    } else {
      stream.push(null);
    }
  };
  stream.pipe(res);

  stream.on("error", (err) => {
    res.end(err);
  });
});

app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`);
});
