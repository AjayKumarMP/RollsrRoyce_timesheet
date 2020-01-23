var { sequelize, Sequelize } = require('../config/db');

var Activity = sequelize.define('Activity', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    paranoid: true,
});



module.exports = Activity;