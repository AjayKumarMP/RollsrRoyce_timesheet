var { sequelize, Sequelize } = require('../config/db');

var Query = sequelize.define('query', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
        validate: {
            isIn: {
                args: [['PENDING', 'INPROCESS', 'SOLVED']],
                msg: 'Must be valid status'
            }
        }
    }
}, {
    freezeTableName: true,
    paranoid: true,
});

module.exports = Query;