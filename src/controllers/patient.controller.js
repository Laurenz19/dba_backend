const Patient = require("../models/patient")
const Sequelize = require('sequelize');
const db = require('../util/database');

/**
 * Create new patient
 */

exports.createPatient = async(req, res) => {

    const PATIENT_MODEL = {
        nom: req.body.nom,
        prenoms: req.body.prenoms,
        genre: req.body.genre,
        adresse: req.body.adresse,
    }

   //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Patient.sequelize = sequelize;

    await Patient.create(PATIENT_MODEL).then((response)=>{
        console.log('Patient created');
        
        Patient.sequelize = db;
        
        res.status(201).json(response);
    }).catch((response)=>{
        /*  console.log(response); */
        
        if(response.errors) res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
        res.status(500).json([{"message": "Vous n'êtes pas autoriser à ajouter un patient"}]);
    
    }); 
}

/**
 * Update patient
 */

exports.updatePatient = async(req, res) => {
     const PATIENT_MODEL = {
        nom: req.body.nom,
        prenoms: req.body.prenoms,
        genre: req.body.genre,
        adresse: req.body.adresse,
    }

    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Patient.sequelize = sequelize;

    await Patient.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Patient introuvable"}]);
        else{
            await Patient.update(PATIENT_MODEL, {where: {id: req.params.id}}).then(async()=>{
                const data = await Patient.findByPk(req.params.id);

                Patient.sequelize = db;

                console.log("patient update completed");
                res.status(200).json(data);
            }).catch((response)=>{

                if(response.errors) res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
                else{
                    res.status(401).json([{"message": "Vous n'êtes pas autoriser à modifier un patient"}]);
                }
            });
        }
    })
}

/**
 * Delete patient
 */

exports.deletePatient = async(req, res) => {
    
    //Switch the connexion to the current user
     const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Patient.sequelize = sequelize;

    await Patient.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Patient introuvable"}]);
        else{
            await Patient.destroy({where: { id: req.params.id }}).then((reponse)=>{
                
                Patient.sequelize = db;

                console.log("Patient deleted")
                res.status(200).json(reponse);
            }).catch((error)=>{
                res.status(401).json([{"message": "Vous n'êtes pas autoriser à supprimer un patient"}]);
                
            })
        }
    })
}

/**
 * Get patient from database
 */

exports.getPatient = async(req, res) => {
   
    //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Patient.sequelize = sequelize;

    await Patient.findByPk(req.params.id).then((response)=>{     
        if(response == null) res.status(404).json([{"message":"Patient introuvable"}]);
        else{
            Patient.sequelize = db;
            res.status(200).json(response);
        }   
    }).catch((error)=>{
        console.log(error)
        res.status(500).json(error); 
    })
}

/**
 * Get all patients
 */

exports.getAllPatients = async(req, res) => {
    
    //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Patient.sequelize = sequelize;
    try{    
            const patients = await Patient.findAll();
            
            Patient.sequelize = db;

            res.status(200).json(patients);
            
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}


