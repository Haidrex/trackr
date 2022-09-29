const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(4001, () => {
  console.log("server is listening");
});
