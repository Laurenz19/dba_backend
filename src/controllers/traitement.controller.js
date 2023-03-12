const Traitement = require("../models/traitement")
const Sequelize = require('sequelize');
const db = require('../util/database');

/**
 * Create Traitement
 */

exports.createTraitement = async(req, res)=>{
    const TRAITEMENT_MODEL = {
        patient_id: req.body.patient_id,
        medecin_id: req.body.medecin_id,
        nbjour: req.body.nbjour,
    }

   //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Traitement.sequelize = sequelize;

    await Traitement.create(TRAITEMENT_MODEL).then((response)=>{
        console.log('Traitement created');
        
        Traitement.sequelize = db;
        
        res.status(201).json(response);
    }).catch((response)=>{
         console.log(response);
        
        if(response.errors) res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
        res.status(500).json([{"message": "Vous n'êtes pas autoriser à ajouter un traitement"}]);
    
    });
}

/**
 * Update traitement
 */

exports.updateTraitement = async(req, res)=>{
    const TRAITEMENT_MODEL = {
        patient_id: req.body.patient_id,
        medecin_id: req.body.medecin_id,
        nbjour: req.body.nbjour,
    }

    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Traitement.sequelize = sequelize;

    await Traitement.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Traitement introuvable"}]);
        else{
            await Traitement.update(TRAITEMENT_MODEL, {where: {id: req.params.id}}).then(async()=>{
                const data = await Traitement.findByPk(req.params.id);

                Traitement.sequelize = db;

                console.log("traitement update completed");
                res.status(200).json(data);
            }).catch((response)=>{

                if(response.errors) res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
                else{
                    res.status(401).json([{"message": "Vous n'êtes pas autoriser à modifier un traitement"}]);
                }
            });
        }
    })
}

/**
 * Delete traitement
 */

exports.deleteTraitement = async(req, res)=>{
    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Traitement.sequelize = sequelize;

    await Traitement.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Traitement introuvable"}]);
        else{
            await Traitement.destroy({where: { id: req.params.id }}).then((reponse)=>{
                
                Traitement.sequelize = db;

                console.log("Patient deleted")
                res.status(200).json(reponse);
            }).catch((error)=>{
                res.status(401).json([{"message": "Vous n'êtes pas autoriser à supprimer un traitement"}]);
                
            })
        }
    })
}

/**
 * Get Traitement
 */

exports.getTraitement = async(req, res)=>{
    //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Traitement.sequelize = sequelize;

    await Traitement.findByPk(req.params.id).then((response)=>{     
        if(response == null) res.status(404).json([{"message":"Traitement introuvable"}]);
        else{
            Traitement.sequelize = db;
            res.status(200).json(response);
        }   
    }).catch((error)=>{
        console.log(error)
        res.status(500).json(error); 
    })
}

/**
 * Get all Traitements
 */

exports.getAllTraitements = async(req, res)=>{
     //Switch the connexion to the current user
     const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Traitement.sequelize = sequelize;
    try{    
            const traitements = await Traitement.findAll();
            
            Traitement.sequelize = db;

            res.status(200).json(traitements);
            
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}