const db = require("../models");
const User = db.user;
const Role = db.role;
const Service = db.service;
const Server = db.server;
const Op = db.Sequelize.Op;

let bcrypt = require("bcryptjs");
function initialRole() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}
function initialUser() {
  User.create({
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 8),
  }).then((user) => {
    Role.findOne({
      where: {
        name: { [Op.or]: ["admin"] },
      },
    }).then((roles) => {
      user.setRoles(roles);
    });
  });
}
function initialServer() {
  Server.create({
    dns_name: "kampus.ankageo.com",
    description: "Kampüs",
    ip_adress: "ip_adress",
  }).then(server => {
    Service.findAll({
      where: {
        name: { [Op.or]: ["PostGIS", "Backend", "GeoServer", "Pano"]}
      }
    }).then(service => {
      server.setServices(service);
    })
  });
  Server.create({
    dns_name: "licence.ankageo.com",
    description: "Lisans",
    ip_adress: "ip_adress",
  }).then(server => {
    Service.findAll({
      where: {
        name: { [Op.or]: ["PostGIS"]}
      }
    }).then(service => {
      server.setServices(service);
    })
  });
  Server.create({
    dns_name: "beyoglu.ankageo.com",
    description: "Beyoğlu",
    ip_adress: "ip_adress",
  }).then(server => {
    Service.findAll({
      where: {
        name: { [Op.or]: ["Backend"]}
      }
    }).then(service => {
      server.setServices(service);
    })
  });
  Server.create({
    dns_name: "kgm.ankageo.com",
    description: "KGM",
    ip_adress: "ip_adress",
  }).then(server => {
    Service.findAll({
      where: {
        name: { [Op.or]: ["PostGIS", "Backend", "GeoServer", "Pano", "Frontend", "Demo"]}
      }
    }).then(service => {
      server.setServices(service);
    })
  });
}
function initialService() {
  Service.create({
    name: "PostGIS",
    description: "description",
  });
  Service.create({
    name: "Backend",
    description: "description",
  });
  Service.create({
    name: "GeoServer",
    description: "description",
  });
  Service.create({
    name: "Pano",
    description: "description",
  });
  Service.create({
    name: "Frontend",
    description: "description",
  });
  Service.create({
    name: "Demo",
    description: "description",
  });
}

module.exports = { 
  initialRole,
  initialUser,
  initialServer,
  initialService  
};
