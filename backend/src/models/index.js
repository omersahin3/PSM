const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    logging:false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.server = require("./server.model.js")(sequelize, Sequelize);
db.service = require("./service.model.js")(sequelize, Sequelize);
db.log = require("./log.model.js")(sequelize, Sequelize);
db.server_service = require("./server_service.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.server.belongsToMany(db.service, {
  through: "server_services"
});
db.service.belongsToMany(db.server, {
  through: "server_services"
});

db.server_service.hasMany(db.log, {
  foreignKey: 'server_services_id', 
  sourceKey: 'id'
});
db.log.belongsTo(db.server_service,{
  foreignKey: 'server_services_id', 
  targetKey: 'id'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
