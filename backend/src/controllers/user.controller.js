const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
const { password } = require("pg/lib/defaults");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => { 
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.Changepass = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      let passwordIsValid = bcrypt.compareSync(
        req.body.current_password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(400).send({
          message: "Invalid Password!"
        });
      }

      if( req.body.current_password == req.body.new_password )
      {
        return res.send({message: 'you entered the same password'});
      }

      if( req.body.new_password == req.body.confirm_new_password) {
        let password = bcrypt.hashSync(req.body.new_password, 8)

        User.update( { password: password }, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Successfully changed user password."
              });
            } else {
              res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
