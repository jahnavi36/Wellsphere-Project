require('dotenv').config()
import express from 'express'
import * as db from './database.js'

const router = express.Router();

//checking for missing attributes

const medicationValidation = () => {
    return (req, res, next) => {

        let expectedAttributes = ['healthCardNumber', 'drugIDNumber', 'drugName', 'quantity', 'datePrescribed'];
        let userAttributes = Object.keys(req.body);
        let errors = expectedAttributes.filter(attr => !userAttributes.includes(attr))

        if (errors.length > 0) {
            return res.status(400).send({ message: 'validation error', invalid: errors })
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

// creating new medication record
router.post('/', medicationValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM medication WHERE healthCardNumber = ?';
    let medicationData = await db.query(sql, body.healthCardNumber);

    if(medicationData.length == 0) {
        sql = 'INSERT INTO medication (healthCardNumber, drugIDNumber, drugName, quantity, datePrescribed) VALUES (?,?,?,?,?)';
        let param = [body.healthCardNumber, body.drugIDNumber, body.drugName, body.quantity, body.datePrescribed]
        await db.query(sql, param);
        return res.status(201).send({ message: 'Medication Record successfully created' })
    }
})

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

// getting medication records through health card numbers
router.get('/:id', healthCardValidation(), async (req, res) => {
    let sql = 'SELECT * FROM medication WHERE healthCardNumber = ?';
    let medicationData = await db.query(sql, req.params.id);
    if (medicationData.length > 0) {
        return res.send(medicationData);
    } else
        return res.status(404).send({ message: `${req.params.id} not found` })
})

// updating medication data

router.patch('/', healthCardValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM medication WHERE healthCardNumber = ?'
    let medicationData = await db.query(sql, body.healthCardNumber)

    if (medicationData.length > 0) {
        sql = 'UPDATE medication SET drugIDNumber = ?, drugName = ?, quantity = ?, datePrescribed = ?, WHERE healthCardNumber = ?';
        let param = [body.drugIDNumber, body.drugName, body.quantity, body.datePrescribed]
        await db.query(sql, param);
        return res.status(200).send({ message: 'Successfully updated' })
    } else {
        return res.status(404).send({ message: 'No results found' })
    }
})

export default router