const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {generateAccessToken, generateRefreshToken} = require('../middleware/authentication');


/**
 * Register function
 */
exports.register = async(req, res)=>{
   

    const USER_MODEL = {
        username : req.body.username,
        email: req.body.email,
        password : req.body.password
    }

    await User.create(USER_MODEL).then((response)=>{
        console.log('User created');
        res.status(201).json(response);
    }).catch((response)=>{
        console.log(response);
        res.status(500).json(response.errors.map(err => { return {"message": err.message}}));
    })

    /* try {
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
      
        console.log("Connexion has been established successfully");
        res.status(200).json("Connexion has been established successfully");
    } catch (error) {
        console.log("Unable to authenticate")
        res.status(500).json("Unable to authenticate");
    } */
}

/**
 * Login function
 */
exports.login = async(req, res)=>{
    
    try {
        const user = await User.findOne({ where: {username: req.body.username}})
        if (user == null) return res.status(401).json({message: "User not found"});
        console.log(user);

        // compare the user password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json({message: "Invalid password"});

        // generate the access token
        const USER_MODEL = {
            id: user.id,
            username: user.username,
            password: req.body.password
        }

        const accessToken = generateAccessToken(USER_MODEL);


        res.status(200).json({
            accessToken
        });
        

    } catch (error) {
        res.status(500).json(error);
    }
}
/**
 * Logout function
 */
exports.logout = async(req, res)=>{
    delete req.headers['authorization'];
    res.status(200).json('User logged out');
}

/**
 * Profile function
 */
exports.profile = async(req, res)=>{
    try {
        const user = await User.findOne({ where: {username: req.body.username}});
        if (!user) return res.status(401).json({message: "User not found"});

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Get all users from database
 */
exports.getAllUsers = async(req, res) => {

    await User.findAll().then((response)=>{
        res.status(200).json(response);
    })

}



/**
 * Refresh token function
 */
exports.refreshToken = async(req, res)=>{
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(401)
      
      delete user.exp
      delete user.iat

      //check if user exist in the database
      const refreshToken = generateAccessToken(user)
      res.send({
        accessToken: refreshToken
      })
    })
}
