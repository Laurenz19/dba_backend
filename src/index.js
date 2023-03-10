const express = require('express');
const morgan = require('morgan');

/**
 * Sequelize && all models 
 */
const sequelize = require('./util/database');
const Medecin = require('./models/medecin');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PUT', 'DELETE');
	next();
})

/**
 * Log all requests
 */
app.use(morgan('dev'));



/**
 * Endpoints
 */
app.use("/api/medecins", require("./routes/medecin.route"));
app.use("/api/patients", require("./routes/patient.route"));
app.use("/api/traitements", require("./routes/traitement.route"));


(async ()=>{
	try{
		//Create all tables before bootstrap the app
		await sequelize.sync(
			{ force:false }
		)
		app.listen(process.env.EXTERNAL_PORT || 3001);
	}catch(error){
		console.log(error)
	}

})()

