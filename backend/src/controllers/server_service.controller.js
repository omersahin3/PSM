const db = require("../models");
const ServerService = db.server_service;

exports.findAll = (req, res) => {
  ServerService.findAll({ 
    include: ["logs"]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving  server_services."
      });
    });
};


