module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
    return Service;
};