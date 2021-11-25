module.exports = (sequelize, Sequelize) => {
  const ServerService = sequelize.define("server_services", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },{ timestamps: false });

  return ServerService;
};
