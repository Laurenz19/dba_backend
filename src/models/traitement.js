const { DataTypes } = require('sequelize');
const db = require("../util/database");


const Traitement = db.define('traitements', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nbjour:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "Veuillez saisir la durée du traitement"
            },
            isNumeric: {
                msg: "Veuillez saisir un nombre"
            },
            min: {
                args: 1,
                msg: "La durée minimum du traitement est une journée"
            }
        }
    },
    dateCons:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }

});

module.exports = Traitement;