// const url = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=49cc8c821cd2aff9af04c9f98c36eb74`
const request = require('request');
const db = require("./models");
const Log = db.log;
const Server = db.server;
const Service = db.service;
const ServerService = db.server_service

async function intervalFunc() {
  // req(url, 4);
  // req2(url2, dns_name);
  const server = await Server.findAll({
    order: [
      ["id", "ASC"],
    ]
  });
  await server.map(function (num) {
    if(num.dataValues.dns_name == "dev-gis.ankageo.com") req2(`https://${num.dataValues.dns_name}/rest/v1/servers/status`, num.dataValues.dns_name)
  })
}

module.exports = intervalFunc;

function req(url, id) {
  request(url, function (err, response, body) {
    if (err) {
      console.log(JSON.stringify({ message: 'error:', err }));
    } else {
      console.log(response.statusCode)
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        Log.create({
          status: true,
          server_services_id: id
        });
      }
      else {
        Log.create({
          status: false,
          server_services_id: id
        });
      }
    }
  });
}

function req2(url, dns_name) {
  request(url, async function (err, response, body) {
    if (err) {
      console.log({ message: 'error:' });
    } else {
      try {
        const server = await Server.findOne({
          where: { dns_name: dns_name },
          include: [{
            model: Service,
            as: "services"
          }],
        })
        const serverService = await ServerService.findAll({
          order: [["id", "ASC"]]
        });
        obj = JSON.parse(body)
        for (const [key, value] of Object.entries(obj)) {
          for (let i = 0; i < server.services.length; i++) {
            if (key.toLowerCase().includes(server.services[i].name.toLowerCase())) {
              const ss = await ServerService.findOne({
                where: { serverId: server.id, serviceId: server.services[i].id },
                order: [["id", "ASC"]]
              });
              Log.create({
                status: value,
                server_services_id: ss.id
              });
            }
          }
        }
      } catch (err) {
        return console.error('upload failed:', err);
      };
    }
  });
}


