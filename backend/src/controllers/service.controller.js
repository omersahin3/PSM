const db = require("../models");
const Service = db.service;
const Server = db.server;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // this code returns if the server does not exist
  if (!req.body.name || !req.body.server) {
    res.status(400).send({
      message: "name,description and server can not be empty!"
    });
    return;
  }

  // this code is adding service without server
  Service.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(service => {
      if (req.body.server) {
        Server.findOne({
          where: {
            dns_name: { [Op.or]: [req.body.server] }
          }
        }).then(server => {
          if (!server) {
            return res.status(404).send({ message: "Server Not found." });
          }
          service.setServers(server).then(() => {
            res.send({ data: service , message: "Successfully added service !" });
          });
        });
      } else {
        res.send({ data: service , message: "Successfully added service !" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service."
      });
    });
};

exports.findAll = (req, res) => {

  Service.findAll({ 
    include: [{
      model: Server,
      as: "servers"
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Service.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Service with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Service with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Service.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Service with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Service.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Service was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Service with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Service.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Services were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Services."
      });
    });
};
