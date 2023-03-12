const Medecin = require('../models/medecin');
const Sequelize = require('sequelize');
const db = require('../utils/database');

/**
 * Create new Medecin
 */

exports.createMedecin = async(req, res)=>{
    
    const MEDECIN_MODEL = {
        numMedecin: req.body.numMedecin,
        nom: req.body.nom,
        prenoms: req.body.prenoms,
        tj: req.body.tarif,
        imageUrl: req.body.imageUrl
    }

    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Medecin.sequelize = sequelize;

    await Medecin.create(MEDECIN_MODEL).then((response)=>{
        console.log('Medecin created');
        
        Medecin.sequelize = db;
        
        res.status(201).json(response);
    }).catch((response)=>{
        console.log(response);
        
        if(response.errors) res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
        else{
            res.status(500).json([{"message": "Vous n'êtes pas autoriser à ajouter un medecin"}]);
        }
       
    });   
   
}

/**
 * Update existing Medecin
 */

exports.updateMedecin = async (req, res)=>{

    const MEDECIN_MODEL = {
        numMedecin: req.body.numMedecin,
        nom: req.body.nom,
        prenoms: req.body.prenoms,
        tj: req.body.tarif,
        imageUrl: req.body.imageUrl
    }

    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Medecin.sequelize = sequelize;

    await Medecin.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Medecin introuvable"}]);
        else{
            await Medecin.update(MEDECIN_MODEL, {where: {id: req.params.id}}).then(async()=>{
                const data = await Medecin.findByPk(req.params.id);

                Medecin.sequelize = db;

                console.log("medecin update completed");
                res.status(200).json(data);
            }).catch((response)=>{

                if(response.errors) res.status(401).json(response.errors.map(err => { return {"message": err.message}}))
                else{
                    res.status(500).json([{"message": "Vous n'êtes pas autoriser à modifier un medecin"}]);
                }
               
            });
        }
    })   
    
}

/**
 * Delete an existing Medecin
 */

exports.deleteMedecin = async (req, res)=>{
    
    //Switch the connexion to the current user
    const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Medecin.sequelize = sequelize;

    await Medecin.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(404).json([{"message":"Medecin introuvable"}]);
        else{
            await Medecin.destroy({where: { id: req.params.id }}).then((reponse)=>{
                
                Medecin.sequelize = db;

                console.log("Medecin deleted")
                res.status(200).json(reponse);
            }).catch((error)=>{
                res.status(401).json([{"message": "Vous n'êtes pas autoriser à supprimer un medecin"}]);
                
            })
        }
    })
}

/**
 * Get a medecin from the database
 */

exports.getMedecin = async(req, res)=>{
   
   //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Medecin.sequelize = sequelize;

    await Medecin.findByPk(req.params.id).then((response)=>{     
        if(response == null) res.status(404).json([{"message":"Medecin introuvable"}]);
        else{
            Medecin.sequelize = db;
            res.status(200).json(response);
        }   
    }).catch((error)=>{
        console.log(error)
        res.status(500).json(error); 
    })
}


/**
 * Get all medecins
 */

exports.getAllMedecins = async (req, res, next)=>{
    
     
   //Switch the connexion to the current user
   const sequelize = new Sequelize(process.env.PGDATABASE, req.user.username, req.user.password,
        {
                host: process.env.PGHOST,
                dialect: 'postgres'
        }
    )
    Medecin.sequelize = sequelize;
    try{    
            const medecins = await Medecin.findAll();
            
            Medecin.sequelize = db;

            res.status(200).json(medecins);
            
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}
