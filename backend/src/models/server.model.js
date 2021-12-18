module.exports = (sequelize, Sequelize) => {
    const Server = sequelize.define("servers", {
        dns_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.TEXT
        },
        ip_adress: {
            type: Sequelize.STRING
        },
    },{ timestamps: false });
    return Server;
};