var { sequelize, Sequelize } = require('../config/db');

var Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    paranoid: true,
});



module.exports = Project;