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
    name: "user",
  });
  Role.create({
    id: 2,
    name: "moderator",
  });
  Role.create({
    id: 3,
    name: "admin",
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
  });
  Server.create({
    dns_name: "licence.ankageo.com",
    description: "Lisans",
    ip_adress: "ip_adress",
  });
  Server.create({
    dns_name: "beyoglu.ankageo.com",
    description: "Beyoğlu",
    ip_adress: "ip_adress",
  });
  Server.create({
    dns_name: "kgm.ankageo.com",
    description: "KGM",
    ip_adress: "ip_adress",
  });
}
function initialService() {
  // kampüs
  Service.create({
    name: "PostGIS",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kampus.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Backend",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kampus.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "GeoServer",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kampus.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Pano",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kampus.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  // Lisans
  Service.create({
    name: "PostGIS",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["licence.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  // Beyoğlu
  Service.create({
    name: "PostGIS",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["beyoglu.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  // KGM
  Service.create({
    name: "PostGIS",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Backend",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "GeoServer",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Pano",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Frontend",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
  Service.create({
    name: "Demo",
    description: "description",
  }).then((service) => {
    Server.findOne({
      where: {
        dns_name: { [Op.or]: ["kgm.ankageo.com"] },
      },
    }).then((server) => {
      service.setServers(server);
    });
  });
}

module.exports = { 
  initialRole,
  initialUser,
  initialServer,
  initialService  
};
