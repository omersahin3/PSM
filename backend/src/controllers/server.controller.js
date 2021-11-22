const db = require("../models");
const Server = db.server;
const Service = db.service;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.dns_name) {
    res.status(400).send({
      message: "Server dns_name can not be empty!"
    });
    return;
  }

  Server.create({
    dns_name: req.body.dns_name,
    description: req.body.description,
    ip_adress: req.body.ip_adress,
  })
    .then(server => {
      res.send({ data: server , message: "Successfully added server !" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Server."
      });
    });
};

exports.findAll = (req, res) => {

  Server.findAll({     
    include: [{
      model: Service,
      as: "services"
    }] 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving servers."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Server.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Server with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Server with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Server.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Server was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Server with id=${id}. Maybe Server was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Server with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Server.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Server was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Server with id=${id}. Maybe Server was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Server with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Server.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Servers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Servers."
      });
    });
};

