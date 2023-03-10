const { Sequelize } = require("sequelize")
exports.sequelize = null

exports.authentication = async(req, res)=>{

    try {
        const dbConnexion = new Sequelize(
            'medecinDB',
            req.body.username,
            req.body.password,
            {
                host: 'localhost',
                dialect: "postgres"
            }
        )
        await dbConnexion.authenticate();
        sequelize = dbConnexion;
        console.log(sequelize)
        console.log("Connexion has been established successfully");
        res.status(200).json("Connexion has been established successfully");
    } catch (error) {
        console.log("Unable to authenticate")
        res.status(500).json("Unable to authenticate");
    }
}
