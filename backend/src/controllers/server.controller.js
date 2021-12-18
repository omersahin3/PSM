const db = require("../models");
const Server = db.server;
const Service = db.service;
const ServerService = db.server_service;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.dns_name || !req.body.description || !req.body.ip_adress) {
    return res.status(400).send({
      message: "Server dns_name can not be empty!"
    });
  }
  try {
    const serverExists = await Server.findAll({ // if server already exists
    })
    for (let i = 0; i < serverExists.length; i++) {
      if (serverExists[i].dns_name == req.body.dns_name) {
        return res.status(404).send({ message: "Server Already Exists." });
      }
    }
    if (req.body.service) { // if service no valid
      const serviceIsValıd = await Service.findAll()
      for (let i = 0; i < req.body.service.length; i++) {
        success = false;
        for (let j = 0; j < serviceIsValıd.length; j++) {
          if (serviceIsValıd[j].id == req.body.service[i].service_id) {
            success = true;
          }
        }
        if (success == false) return res.status(404).send({ message: "Service Not found." });
      }
    }
    const server = await Server.create({
      dns_name: req.body.dns_name,
      description: req.body.description,
      ip_adress: req.body.ip_adress,
    })
    if (req.body.service) {
      for (let i = 0; i < req.body.service.length; i++) {
        await ServerService.create({
          serverId: server.id,
          serviceId: req.body.service[i].service_id
        });
      }
    }
    res.send({ data: server, message: "Successfully added server !" });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Server."
    });
  };
};

exports.findAll = async (req, res) => {
  try {
    const server = await Server.findAll({
      include: [{
        model: Service,
        as: "services"
      }],
      order: [['id', 'ASC']]
    })
    res.send(server);
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving servers."
    });
  };
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const server = await Server.findOne({
      where: { id: id },
      include: [{
        model: Service,
        as: "services"
      }],
    })
    if (server) {
      res.send(server);
    } else {
      res.status(404).send({
        message: `Cannot find Server with id=${id}.`
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: "Error retrieving Server with id=" + id
    });
  };
};
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    // server.setServices(service); edit not working
    let service = [];
    const num = await Server.update(req.body, {
      where: { id: id }
    })
    if (num == 1) {
      if (req.body.service) {
        // console.log(req.body.service)
        const data = await ServerService.findAll({
          where: {
            serverId: { [Op.or]: [id] },
          }
        })
        for (let i = 0; i < data.length; i++) {
          service[i] = data[i].dataValues.serviceId;
        }
        // console.log(service)
        for (let i = 0; i < req.body.service.length; i++) {
          for (let j = 0; j < service.length; j++) {
            if (service[j] == req.body.service[i].service_id) {
              service.splice(j, 1);
            }
          }
          const serverService = await ServerService.findAll({
            where: {
              serverId: { [Op.or]: [id] },
              serviceId: { [Op.or]: [req.body.service[i].service_id] }
            }
          })
          if (serverService.length <= 0) { // just add the ones that aren't
            await ServerService.create({ // drops to catch if the service id is invalid
              serverId: id,
              serviceId: req.body.service[i].service_id
            })
          }
        }
        for (let i = 0; i < service.length; i++) {
          await ServerService.destroy({
            where: {
              serverId: id,
              serviceId: service[i]
            }
          })
        }
      }
      res.send({ message: "Service was updated successfully." });
    } else {
      res.send({ message: `Cannot update Server with id=${id}. Maybe Server was not found or req.body is empty!` });
    }
  }
  catch (err) {
    res.status(500).send({ message: "Error updating Server with id=" + id });
  };
};
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Server.destroy({
      where: { id: id }
    })
    if (num == 1) {
      res.send({
        message: "Server was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Server with id=${id}. Maybe Server was not found!`
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: "Could not delete Server with id=" + id
    });
  };
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Server.destroy({
      where: {},
      truncate: false
    })
    res.send({ message: `${nums} Servers were deleted successfully!` });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Servers."
    });
  };
};

