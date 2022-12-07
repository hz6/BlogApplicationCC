require('dotenv').config();

module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DIALECT: process.env.DIALECT,
    DBNAME: process.env.DBNAME,
    SSL: true,
}