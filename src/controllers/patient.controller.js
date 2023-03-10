/**
 * Create new patient
 */

exports.createPatient = (req, res) => {
    res.status(200).json("Allows you to add a new patient");
}

/**
 * Update patient
 */

exports.updatePatient = (req, res) => {
    res.status(200).json("Allows you to update a patient");
}

/**
 * Delete patient
 */

exports.deletePatient = (req, res) => {
    res.status(200).json("Allows you to delete a patient");;
}

/**
 * Get patient from database
 */

exports.getPatient = (req, res) => {
    res.status(200).json("Allows you to get a patient");
}

/**
 * Get all patients
 */

exports.getAllPatients = (req, res) => {
    res.status(200).json("Allows you to get all");
}


