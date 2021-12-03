const db = require("../models");
const ServerService = db.server_service;
const Service = db.service;
const Server = db.server;
const Log = db.log;

exports.findAll = (req, res) => {
  ServerService.findAll({
    include: ["logs"],
    order: [
      ["id", "ASC"],
      [Log, "id", "ASC"]
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving  server_services.",
      });
    });
};
exports.dashboard = async (req, res) => {
  const serverdata = await Server.findAll({
    include: [
      {
        model: Service,
        as: "services"
      },
    ],
    order: [
      ["id", "ASC"],
      [Service, "id", "ASC"]
    ]
  });
  const data = await ServerService.findAll({
    include: ["logs"],
    order: [
      ["id", "ASC"],
      [Log, "id", "ASC"]
    ]
  });
  for (let i = 0; i < serverdata.length; i++) {
    for (let j = 0; j < serverdata[i].services.length; j++) {
      for (let k = 0; k < data.length; k++) {
        if (data[k].serviceId == serverdata[i].services[j].id && data[k].serverId == serverdata[i].dataValues.id) {
          let last = data[k].logs.length - 1;
          if (data[k].logs.length > 0) {
            serverdata[i].services[j].dataValues.logstatus = data[k].logs[last].status;
          }else{
            serverdata[i].services[j].dataValues.logstatus = false;
          }
        }
      }
    }
  }

  res.send(serverdata);
  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while retrieving dashboard."
  //   });
  // });
};
