/**
 * Create Traitement
 */

exports.createTraitement = (req, res)=>{
    res.status(200).json("Allows you to add new traitement");
}

/**
 * Update traitement
 */

exports.updateTraitement = (req, res)=>{
    res.status(200).json("Allows you to update a specific traitement");
}

/**
 * Delete traitement
 */

exports.deleteTraitement = (req, res)=>{
    res.status(200).json("Allows you to delete a specific traitement");
}

/**
 * Get Traitement
 */

exports.getTraitement = (req, res)=>{
    res.status(200).json("Allows you to get a specific traitement");
}

/**
 * Get all Traitements
 */

exports.getAllTraitements = (req, res)=>{
    res.status(200).json("Allows you to get all Traitements");
}