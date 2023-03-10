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
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: false,
        }
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Veuillez entrer le nom du medecin"
            },
            len: {
                args: [3, 20],
                msg:"Le nom du medecin doit contenir 3 à 20 caractères"
            }
        }
    },
    prenoms:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:{
                msg: "Veuillez saisir le prénom du patient"
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
            notEmpty: {
                msg: "Veuillez saisir le tarif journalier"
            },
            min: {
                args: 100,
                msg: "Le tarif minimum est de 100 Ar"
            }
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    }
})

Medecin.hasMany(Traitement, {
    foreignKey: {
        name: 'medecin_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

Traitement.belongsTo(Medecin);

module.exports = Medecin;