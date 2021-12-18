const db = require("../models");
const Service = db.service;

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({
      message: "name,description can not be empty!"
    });
  }
  try {
    const service = await Service.create({
      name: req.body.name,
      description: req.body.description,
    })
    res.send({ data: service, message: "Successfully added service !" });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Service."
    });
  };
};

exports.findAll = async (req, res) => {
  try {
    const data = await Service.findAll({
      order: [['id', 'ASC']]
    })
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving services."
    });
  };
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Service.findByPk(id)
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Service with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Service with id=" + id
    });
  };
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Service.update(req.body, {
      where: { id: id }
    })
    if (num == 1) {
      res.send({ message: "Service was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Service with id=" + id
    });
  };
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Service.destroy({
      where: { id: id }
    })
    if (num == 1) {
      res.send({
        message: "Service was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Service with id=" + id
    });
  };
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Service.destroy({
      where: {},
      truncate: false
    })
    res.send({ message: `${nums} Services were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Services."
    });
  };
};
