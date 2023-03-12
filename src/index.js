const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const fs = require("fs")
const YAML = require('yaml')

require('dotenv').config();

const medecinRoutes = require("./routes/medecin.route");
const userRoutes = require("./routes/user.route");
const patientRoutes = require("./routes/patient.route");
const traitementRoutes = require("./routes/traitement.route");

/**
 * Sequelize && allows the app to 
 * create all tables in the database
 */
const sequelize = require('./utils/database');
const Medecin = require('./models/medecin');
const Patient = require('./models/patient');
const Traitement = require('./models/traitement');
const User = require('./models/user');




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
app.use("/api", userRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/traitements", traitementRoutes);

/**
 * Swagger documentation
 */
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


(async ()=>{
	//Development mode
	if(process.env.PGDATABASE == undefined) process.env.PGDATABASE = 'medecinDB';
	if(process.env.PGUSER == undefined) process.env.PGUSER = 'postgres';
	if(process.env.PGPASSWORD == undefined) process.env.PGPASSWORD = 'postgres';
	if(process.env.PGHOST == undefined) process.env.PGHOST = 'localhost';

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

