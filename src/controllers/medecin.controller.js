const Medecin = require('../models/medecin');

/**
 * Create new Medecin
 */

exports.createMedecin = async(req, res)=>{
    
    const MEDECIN_MODEL = {
        numMedecin: req.body.numMedecin,
        nom: req.body.nom,
        prenoms: req.body.prenoms,
        tj: req.body.tarif,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl
    }
    console.log(MEDECIN_MODEL)

    await Medecin.create(MEDECIN_MODEL).then((response)=>{
        console.log('Medecin created');
        res.status(201).json(response);
    }).catch((response)=>{
        console.log(response)
        res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
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
        phone: req.body.phone,
        imageUrl: req.body.imageUrl
    }

    await Medecin.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(401).json([{"message":"Medecin introuvable"}]);
        else{
            await Medecin.update(MEDECIN_MODEL, {where: {id: req.params.id}}).then(async()=>{
                const data = await Medecin.findByPk(req.params.id);
                res.status(200).json(data);
            }).catch((response)=>{
                res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
            });
        }
    })
    
}

/**
 * Delete existingMedecin
 */

exports.deleteMedecin = async (req, res)=>{
    
    await Medecin.findByPk(req.params.id).then(async(response)=>{
        if(response == null) res.status(401).json([{"message":"Medecin introuvable"}]);
        else{
            await Medecin.destroy({where: { id: req.params.id }}).then((reponse)=>{
                console.log("Medecin deleted")
                res.status(200).json(reponse)
            }).catch((error)=>{
                res.status(500).json(error)  
            })
        }
    })
}

/**
 * Get a medecin from the database
 */

exports.getMedecin = async(req, res)=>{
    try {
        let medecin = await Medecin.findByPk(req.params.id);
        res.status(200).json(medecin);   
       
    } catch (error) {
        res.status(500).json(error);   
    }
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
