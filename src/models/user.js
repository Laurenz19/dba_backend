const { DataTypes } = require('sequelize');
const db = require('../util/database');

const User = db.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            notNull:{
                msg:"Veuillez saisir le nom de l'utilisateur"
            },
            len:{
                args:[3,20],
                msg:"Veuillez saisir entre 3 et 20 caractères"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            notNull:{
                msg:"Veuillez saisir l'email de l'utilisateur"
            },
            isEmail: {
                arg: true,
                msg:"Veuillez saisir un email valide"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            notNull:{
                arg: true,
                msg:"Veuillez saisir le mot de passe"
            },
            len:{
                args:[6,20],
                msg:"Le mot de passe doit contenir 6 à 20 caractères"
            },
            isAlphanumeric: {
                arg: true,
                msg:"Le mot de passe devrait être alphanumerique"
            }
        }
    }
})

module.exports = User;
