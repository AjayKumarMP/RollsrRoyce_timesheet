const { sequelize, Sequelize } = require('../config/db');
const Project = require('./project'),
    Activity = require('./activity')

var TimeSheet = sequelize.define('TIMESHEET', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hours: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    }
}, {
    freezeTableName: true,
    paranoid: true,
})

TimeSheet.belongsTo(Project)
TimeSheet.belongsTo(Activity)

module.exports = TimeSheet;