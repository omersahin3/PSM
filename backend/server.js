const { app } = require("./src/app");


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const http = require('http');
const db = require("./src/models");
const intervalFunc = require("./logs");
const ServerService = db.server_service;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  ServerService.findAll({ 
    include: ["logs"]
  }).then(data => {
    res.end(JSON.stringify({ data: data }));
  });
});

server.listen(8009);
setInterval(intervalFunc, 300000);
// 300000