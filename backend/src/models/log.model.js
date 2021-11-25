module.exports = (sequelize, Sequelize) => {
  const Log = sequelize.define("logs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.BOOLEAN, 
      defaultValue: true,
      allowNull: false
    }
  });

  return Log;
};
