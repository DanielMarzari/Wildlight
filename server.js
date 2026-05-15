const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3011", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, hostname, () => {
    console.log(`> Wildlight ready on http://${hostname}:${port}`);
  });
});
