const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Traitement = require("./traitement");

const Patient = db.define('patients', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nom:{
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            notNull: {
                msg: "veuillez saisir le nom du patient"
            },
            notEmpty: {
                msg: "Le nom ne peut pas être vide"
            },
            len: {
                args: [3, 20],
                msg: "le nom doit contenir 3 à 20 caractères"
            },
        }
    },
    prenoms:{
        type: DataTypes.STRING(50),
        allowNull: true,
        validate:{
            notEmpty: {
                msg: "veuillez saisir le prénom du patient",   
            },
            notEmpty:{
                msg: "les prénoms ne peut pas être vide"
            },
            len: {
                args: [3, 50],
                msg: "le prénom doit contenir 3 à 50 caractères"
            }
        }
    },
    genre:{
        type: DataTypes.CHAR,
        allowNull: false,
        validate:{
            notNull: {
                msg: "veuillez renseigner le genre du patient"
            },
            isIn:{
                args: ['M', 'F'],
                msg: "le genre doit être Masculin ou Feminin"
            }
        }
    },
    adresse:{
        type: DataTypes.STRING(100),
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

//Traitement.belongsTo(Patient)

module.exports = Patient;