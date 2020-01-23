var { sequelize, Sequelize } = require('../config/db');
const bcrypt = require('bcrypt'),
    TimeSheet = require('./timeSheet'),
    Query = require('../models/queries')

var User = sequelize.define('USER', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER',
        validate: {
            isIn: {
                args: [['USER', 'MANAGER', 'ADMIN']],
                msg: 'Must be valid role'
            }
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    emp_joined_date: {
        type: Sequelize.DATE
    },
    emp_end_date: {
        type: Sequelize.DATE
    },

}, {
    freezeTableName: true,
    paranoid: true,
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
        }
    }
});

User.prototype.validatePassword = (encyPassword, password) => {
    return bcrypt.compareSync(password, encyPassword)
}

User.hasMany(TimeSheet)
User.hasMany(Query)

module.exports = User;