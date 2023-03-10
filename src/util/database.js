const Sequelize = require('sequelize');

/*const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }
)*/

const sequelize = new Sequelize(
    'medecinDB',
    'laurenzio',
    'laurenzio',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

module.exports = sequelize;
