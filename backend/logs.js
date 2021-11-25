const http = require('http');
const url = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=49cc8c821cd2aff9af04c9f98c36eb74`
const request = require('request');
const db = require("./src/models");
const Log = db.log;
const ServerService = db.server_service;

function logs() {
  const server = http.createServer((req, res) => {
    request(url, function reqq(err, response, body) {
      if(err){
        res.end(JSON.stringify({ message: 'error:', err }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify({ data: response.statusCode }));
        console.log(response.statusCode)
        // Log.create({
        //   status:true,
        //   server_services_id: 1
        // }).then(log => {
        //   console.log(log)
        // });
        ServerService.findAll({ 
          include: ["logs"]
        }).then(data => {
          res.end(JSON.stringify({ data: data }));
        });
      }
    });
  });
}
module.exports = logs;
