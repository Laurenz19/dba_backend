const { DataTypes, Sequelize } = require('sequelize');
const db = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            notEmpty: {
                msg:"l'email ne peut pas être vide"
            },
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
    
        }
    }
})

User.addHook('beforeCreate', 'pg_user_create', async(user, options)=>{

    //Create a pg_user
    await db.query(`CREATE USER ${user.username} WITH PASSWORD '${user.password}'`).then(response=>{
        console.log(response)
        console.log('pg_user created')
    }).catch(error=>{
        console.log(error)
    })

    //Grant the user to read the public schema
    await db.query(`GRANT USAGE ON SCHEMA PUBLIC TO ${user.username}`).then(()=>{
        console.log('User granted access to public schema');
    }).catch(error=>{
        console.log(error)
    })

    //Grant the user to select, insert, update, delete
    await db.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA PUBLIC TO ${user.username}`).then(()=>{
        console.log('User granted to select, insert, update, delete on all tables in public schema');
    }).catch(error=>{
        console.log(error)
    })

     //Grant the user to use all sequences in
     await db.query(`GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA PUBLIC TO ${user.username}`).then(()=>{
        console.log('User granted to select, insert, update, delete on all tables in public schema');
    }).catch(error=>{
        console.log(error)
    })
  
    //hashing the password for the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
});

module.exports = User;
