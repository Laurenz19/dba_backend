const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Traitement = require("./traitement");

const Patient = db.define('patients', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "veuillez saisir le nom du medecin"
            },
            len: {
                args: [3, 20],
                msg: "le nom doit contenir 3 à 20 caractères"
            },
        }
    },
    prenoms:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: {
                msg: "veuillez saisir le prénom du medecin",   
            },
            len: {
                args: [3, 50],
                msg: "le prénom doit contenir 3 à 50 caractères"
            }
        }
    },
    adresse:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:{
                args: [3, 100],
                msg: "le adresse doit contenir 3 à 200 caractères"
            }
        }
    }

});

Patient.hasMany(Traitement, {
    foreignKey: {
        name: 'patient_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

Traitement.belongsTo(Patient)

module.exports = Patient;