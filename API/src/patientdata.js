require('dotenv').config()
import express from 'express'
import * as db from './database.js'
import jwt from 'express-jwt'

const router = express.Router();

//validation for patient attributes
const patientValidation = () => {
    return (req, res, next) => {

        // check for missing attributes
        let expectedAttributes = ['healthCardNumber', 'address', 'city', 'province', 'birthDate', 'phone', 'firstName', 'lastName'];
        let userAttributes = Object.keys(req.body);
        let errors = expectedAttributes.filter(attr => !userAttributes.includes(attr))

        // check for valid healthcard number
        // if healthCardNumber is not a missing attribute
        if (userAttributes.indexOf('healthCardNumber') > -1) {
            let healthCardPattern = new RegExp("^\\d{9}$");
            let healthCard = req.body.healthCardNumber;
            if (!healthCard.match(healthCardPattern)) {
                errors.push('healthCardNumber');
            }
        }

        // check birthday for earlier than today
        // if birthDate is not a missing attribute
        if (userAttributes.indexOf('birthDate') > -1) {
            let today = new Date();
            let birthDate = new Date (req.body.birthDate)
            if (birthDate > today.getTime()) {
                errors.push('birthDate')
            }
        }

        // check phone number for 10 digits
        // if phone number is not a missing attribute
        if (userAttributes.indexOf('phone') > -1) {
            let phoneDigits = new RegExp("^\\d{10}$");
            let phone = req.body.phone;
            if (!phone.match(phoneDigits)) {
                errors.push('phone');
            }
        }

        if (errors.length > 0) {
            return res.status(400).send({ message: 'validation error', invalid: errors })
        }
        next();
    }
}

//validation for healthCard
const healthCardValidation = () => {
    return (req, res, next) => {
        
        let healthCardPattern = new RegExp("^\\d{9}$");
        let healthCard = req.params.id;
        if (!healthCard.match(healthCardPattern)) {
            return res.status(400).send({ message: 'invalid health card number'})
        }
        next();
    }
}

// all routes below to be accessed with valid JWT
// router.use(jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}))

// //scan all routes below for error for valid jwt, modify error message if there is an error
// router.use(function(err,req,res,next){
//     if(err.name === 'UnauthorizedError') {
//         if(err.message === 'jwt expired'){
//             return res.status(403).send({message: "token expired"})
//         } else if(err.message === 'No authorization token was found'){
//             return res.status(403).send({message: "token not provided"})
//         } else {
//             return res.status(401).send({message: "Unauthorized access"})
//         }
//     }
//     next();
// })

//create patient 
router.post('/', async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM patient WHERE healthCardNumber = ?';
    let patient = await db.query(sql, body.healthCardNumber);

    if(patient.length == 0) {
        sql = 'INSERT INTO patient (healthCardNumber, address, city, province, birthDate, phone, firstName, lastName) VALUES (?,?,?,?,?,?,?,?)';
        let param = [body.healthCardNumber, body.address, body.city, body.province, body.birthDate, body.phone, body.firstName, body.lastName]
        await db.query(sql, param);
        return res.status(201).send({ message: 'Patient successfully created' })
    } else {
        return res.status(400).send({message: 'Patient already exists'})
    }
})

//read patient data using health card number
router.get('/:id', healthCardValidation(), async (req, res) => {
    let sql = 'SELECT * FROM patient WHERE healthCardNumber = ?';
    let patientData = await db.query(sql, req.params.id);
    if (patientData.length > 0) {
        return res.send(patientData);
    } else
        return res.status(404).send({ message: `${req.params.id} not found` })
})

//search patient data by name
router.get('/search/:id', async (req, res) => {
    let sql = "SELECT * FROM patient WHERE healthCardNumber = ?";
    let patientData = await db.query(sql, req.params.id);
    if (patientData.length > 0) {
        return res.status(200).send(patientData);
    } else {
        return res.status(404).send({ message: 'No results found' })
    }

})

//update patient data
router.patch('/', async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM patient WHERE healthCardNumber = ?'
    let patient = await db.query(sql, body.healthCardNumber)

    if (patient.length > 0) {
        sql = 'UPDATE patient SET address = ?, city = ?, province = ?, birthDate = ?, phone = ?, firstName = ?, lastName = ? WHERE healthCardNumber = ?';
        let param = [body.address, body.city, body.province, body.birthDate, body.phone, body.firstName, body.lastName, body.healthCardNumber]
        await db.query(sql, param);
        return res.status(200).send({ message: 'Successfully updated' })
    } else {
        return res.status(404).send({ message: 'No patient found' });
    }
})


//delete patient
router.delete('/:id', async (req, res) => {

    let sql = 'SELECT * FROM patient WHERE healthCardNumber = ?'
    let patient = await db.query(sql, req.params.id)

    if (patient.length > 0) {
        sql = 'DELETE FROM patient WHERE healthCardNumber = ?';
        await db.query(sql, req.params.id);
        return res.status(200).send({ message: 'Successfully deleted' })
    } else {
        return res.status(404).send({ message: 'No patient found' })
    }
})


export default router