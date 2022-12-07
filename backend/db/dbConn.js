const { Sequelize } = require('sequelize');
const keys = require('./dbConfig');

const sequelize = new Sequelize(keys.DBNAME, keys.USERNAME, keys.PASSWORD, {
    host: keys.HOST,
    port: keys.PORT,
    dialect: keys.DIALECT,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: process.env.SSL
        }
    }
});

const verifyConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection Successful.');
    } catch (error) {
        console.error('Connection Failed.', error);
    }
};

verifyConn();

module.exports = sequelize;