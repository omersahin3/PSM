const url = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=49cc8c821cd2aff9af04c9f98c36eb74`
const request = require('request');
const db = require("./src/models");
const Log = db.log;
const ServerService = db.server_service;

function intervalFunc() {
  request(url, function (err, response, body) {
    if(err){
      console.log(JSON.stringify({ message: 'error:', err }));
    } else {
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
      });
    }
  });
}
module.exports = intervalFunc;
