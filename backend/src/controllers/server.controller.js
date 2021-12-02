const db = require("../models");
const Server = db.server;
const Service = db.service;
const ServerService = db.server_service;
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
      if (req.body.service) {
        for(let i=0;i<req.body.service.length;i++){
          Service.findOne({
            where: {
              id: { [Op.or]: [req.body.service[i].service_id] }
            }
          }).then(service => {
            if (!service) {
              return res.status(404).send({ message: "Service Not found." });
            }
            server.setServices(service);
          });
        }
      } 
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
    }],
    order: [['id' , 'ASC']]
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

  Server.findOne({
    where: { id: id },
    include: [{
      model: Service,
      as: "services"
    }],
  })
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
  // server.setServices(service); edit not working
  const id = req.params.id;
  let service = [];
  Server.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        if (req.body.service) {
          console.log(req.body.service)
          ServerService.findAll({
            where: {
              serverId: { [Op.or]: [id] },
            }
          }).then(data => {
            for(let i=0; i< data.length; i++){
              service[i] = data[i].dataValues.serviceId;
            }

            for(let i=0;i< req.body.service.length;i++){
              for(let j=0;j< service.length;j++){
                if(service[j] == req.body.service[i].service_id){
                  service.splice(j,1);
                }
              }
              console.log(service)
              ServerService.findAll({
                where: {
                  serverId: { [Op.or]: [id] },
                  serviceId: { [Op.or]: [req.body.service[i].service_id] }
                }
              }).then(serverService => {
                if(serverService.length <= 0){
                  console.log(req.body.service[i].service_id)
                  ServerService.create({
                    serverId: id,
                    serviceId: req.body.service[i].service_id
                  })
                }
              });
            }
            for(let i=0; i< service.length;i++){
              ServerService.destroy({
                where: { 
                  serverId: id,
                  serviceId: service[i]
                }
              })
              console.log("sildim")
            }
          });
        }
        res.send({ message: "Service was updated successfully." });
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
// exports.update = (req, res) => {
//   // server.setServices(service); edit not working
//   const id = req.params.id;
//   let service= [];
//   Server.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         if (req.body.service) {
//           console.log(req.body.service)
//           ServerService.findAll({
//             where: {
//               serverId: { [Op.or]: [id] },
//             }
//           }).then(data => {
//             for(let i=0; i< data.length; i++){
//               service[i]= data[i].dataValues.serviceId;
//             }
//           });

//           for(let i=0;i<req.body.service.length;i++){
//             for(let j=0;j< service.length;j++){
//               if(service[j] == req.body.service[i].service_id){

//               }
//             }
//             ServerService.findAll({
//               where: {
//                 serverId: { [Op.or]: [id] },
//                 serviceId: { [Op.or]: [req.body.service[i].service_id] }
//               }
//             }).then(serverService => {
//               if(serverService.length <= 0){
//                 console.log(req.body.service[i].service_id)
//                 ServerService.create({
//                   serverId: id,
//                   serviceId: req.body.service[i].service_id
//                 })
//               }else {
//                 // ServerService.destroy({
//                 //   where: { 
//                 //     serverId: id,
//                 //     serviceId: req.body.service[i].service_id
//                 //   }
//                 // })
//                 console.log("silemedim")
//               }
//             });
//           }
//         }
//         res.send({ message: "Service was updated successfully." });
//       } else {
//         res.send({
//           message: `Cannot update Server with id=${id}. Maybe Server was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Server with id=" + id
//       });
//     });
// };


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

