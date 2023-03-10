const Medecin = require('../models/medecin');

/**
 * Create new Medecin
 */

exports.createMedecin = (req, res)=>{
    res.status(200).json("Allows you to add a new medecin");
}

/**
 * Update existingMedecin
 */

exports.updateMedecin = (req, res)=>{
    res.status(200).json("Allows you to update");
}

/**
 * Delete existingMedecin
 */

exports.deleteMedecin = (req, res)=>{
    res.status(200).json("A function to delete a specificMedecin");
}

/**
 * Get a medecin from the database
 */

exports.getMedecin = (req, res)=>{
    res.status(200).json("A function to get a specificMedecin");
}


/**
 * Get all medecins
 */

exports.getAllMedecins = async (req, res, next)=>{
    try{
        const medecins = await Medecin.findAll();
        res.status(200).json(medecins);
    }catch(error){
        res.status(500).json(error);
    }
}
