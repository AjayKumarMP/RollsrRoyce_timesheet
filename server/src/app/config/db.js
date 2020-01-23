const Sequelize = require("sequelize");
const config = require('../../../config/env')
console.log(config.database, config.username, config.password, config.dialect, config.port)
var sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    port: 3306
});

sequelize
    .authenticate()
    .then((success) => { 
        console.log("conntected  to databse");
    }, (err) => {
        console.log("error in conntecting  to databse",err);
    });

    sequelize
    .sync({force:false})
    .then((success) => { 
        console.log("syncing is done");
    }, (err) => {
        console.log("error databse syncing",err);
    });

    module.exports.sequelize = sequelize;
    module.exports.Sequelize = Sequelize;