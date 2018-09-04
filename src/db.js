const Sequelize = require('sequelize');
const config = require("config");

const mysqlconnection = new Sequelize(config.db.database, config.db.user, config.db.pwd, config.dbConfig);
module.exports = mysqlconnection;