const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await User.update(req.body, {
      where: { id: id }
    })
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  };
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id)
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  };
};

exports.changepass = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id)
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
    if (req.body.current_password != req.body.new_password) {
      if (req.body.confirm_new_password == req.body.new_password) {
        let password = bcrypt.hashSync(req.body.new_password, 8)
        const num = await User.update({ password: password }, {
          where: { id: id }
        })
        return res.send({ message: "Successfully changed user password." });
      } else {
        return res.send({ message: 'The password confirmation does not match' });
      }
    } else {
      if (req.body.confirm_new_password == req.body.new_password) {
        return res.send({ message: 'The new password must be different from the current password' });
      } else {
        return res.send({ message: "The password confirmation does not match" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
};
