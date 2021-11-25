const { app } = require("./src/app");


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const http = require('http');
const url = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=49cc8c821cd2aff9af04c9f98c36eb74`
const request = require('request');
const db = require("./src/models");
const Log = db.log;
const ServerService = db.server_service;
const server = http.createServer((req, res) => {
  request(url, function (err, response, body) {
    if(err){
      res.end(JSON.stringify({ message: 'error:', err }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log(response.statusCode)
      if(response.statusCode >= 200 && response.statusCode <= 299){
        Log.create({
          status:true,
          server_services_id: 1
        });
      }
      else{
        Log.create({
          status:false,
          server_services_id: 1
        });
      }
      ServerService.findAll({ 
        include: ["logs"]
      }).then(data => {
        res.end(JSON.stringify({ data: data }));
      });
    }
  });
});

server.listen(8009);

setInterval(() => {
  // Adapting a keep-alive agent
  http.get('http://localhost:8009', (res) => {
    res.on('data', (data) => {
      // Do nothing
    });
  });
}, 300000);
// 300000