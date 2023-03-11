const { DataTypes } = require('sequelize');
const db = require("../util/database");
const Traitement = require("./traitement");

const Medecin = db.define('medecins', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    numMedecin:{
        type: DataTypes.STRING(5),
        allowNull: true,
        unique: true,
        validate: {
            isAlphanumeric: true,
            len:{
                arg:[1,5],
                msg:"Le numéro du medecin doit contenir 1 à 5 caractères"
            } 
        }
    },
    nom:{
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            notNull:{
                msg: "Veuillez saisir le nom du medecin"
            },
            notEmpty: {
                msg: "Le nom ne peut pas être vide"
            },
            len: {
                args: [3, 20],
                msg:"Le nom du medecin doit contenir 3 à 20 caractères"
            }
        }
    },
    prenoms:{
        type: DataTypes.STRING(50),
        allowNull: true,
        validate:{
            notEmpty:{
                msg:"Le prénoms ne peut pas être vide"
            },
            len:{
                args: [3, 50],
                msg:"Prénoms du medecin doit contenir 3 à 50 caractères"
            }
        }
    },
    tj:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notNull:{
                msg: "Veuillez saisir le tarif journalier"
            },
            notEmpty: {
                msg: "Le tarif ne peut pas être vide"
            },
            isInt:{
                args: true,
                msg: "Le tarif journalier devrait être un nombre"
            },
            min: {
                args: 100,
                msg: "Le tarif minimum est de 100 Ar"
            }
        }
    },
    imageUrl: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
})

Medecin.hasMany(Traitement, {
    foreignKey: {
        name: 'medecin_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

//Traitement.belongsTo(Medecin);

module.exports = Medecin;