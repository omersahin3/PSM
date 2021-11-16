module.exports = (sequelize, Sequelize) => {
    const Server = sequelize.define("servers", {
        dns_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        ip_adress: {
            type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
    return Server;
};