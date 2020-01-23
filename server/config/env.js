const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')

// const configs = Object.freeze({
//     base: {
//         env,
//         host: '0.0.0.0',
//         port: 3000,
//         secret: "secretKey for sessions"
//     },
//     development: Object.freeze({
//         username: 'root',
//         password: 'root',
//         database: 'RREmployeeTimeSheet',
//         host: '127.0.0.1',
//         dialect: 'mysql',
//         port: 3000
//     }),
//     integration: Object.freeze({
//         username: 'root',
//         password: null,
//         database: 'RREmployeeTimeSheet',
//         host: '127.0.0.1',
//         dialect: 'mysql',
//         port: 3000
//     }),
//     production: Object.freeze({
//         username: 'root',
//         password: null,
//         database: 'RREmployeeTimeSheet',
//         host: '127.0.0.1',
//         dialect: 'mysql',
//         port: 3000,
//         adminEmail: 'ajaykumarmp145@gmail.com',
//         toEmail: 'ajaykumarmp145@gmail.com',
//         mailHost: 'smtp.ethereal.email'
//     })
// });

module.exports = Object.assign({ env }, config[env]);