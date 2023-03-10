const Sequelize = require('sequelize');
const db = require("../util/database")

const Medecin = db.define('medecins', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    numMedecin:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nom:{
        type: Sequelize.STRING,
        allowNull: false
    },
    prenoms:{
        type: Sequelize.STRING,
        allowNull: true
    },
    tj:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Medecin;