require('dotenv').config()
import express from 'express'
import * as db from './database.js'

const router = express.Router();

//checking for missing attributes

const labValidation = () => {
    return (req, res, next) => {

        let expectedAttributes = ['healthCardNumber', 'labNumber', 'testDate', 'orderedBy', 'testResult', 'labTestImages'];
        let userAttributes = Object.keys(req.body);
        let errors = expectedAttributes.filter(attr => !userAttributes.includes(attr));

        if (errors.length > 0) {
            return res.status(400).send({ message: 'validation error', invalid: errors })
        }
        next();
}}

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

// creating new lab result 
router.post('/', labValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM labResults WHERE healthCardNumber = ?';
    let labData = await db.query(sql, body.healthCardNumber);

    if(labData.length == 0) {
        sql = 'INSERT INTO labResults (healthCardNumber, labNumber, testDate, orderedBy, testResult, labTestImages) VALUES (?,?,?,?,?,?)';
        let param = [body.healthCardNumber, body.labNumber, body.testDate, body.orderedBy, body.testResult, body.labTestImages]
        await db.query(sql, param);
        return res.status(201).send({ message: 'Lab Result Record successfully created' })
    }})

// validating health card number
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

//searching lab results by health card number
router.get('/', healthCardValidation(), async (req, res) => {
    let sql = 'SELECT * FROM labResults WHERE healthCardNumber = ?';
    let labData = await db.query(sql, req.params.id);
    if (labData.length > 0) {
        return res.send(labData);
    } else
        return res.status(404).send({ message: `${req.params.id} not found` })
})

// updating lab data

router.patch('/', healthCardValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM labResults WHERE healthCardNumber = ?'
    let labData = await db.query(sql, body.healthCardNumber)

    if (labData.length > 0) {
        sql = 'UPDATE labResults SET labNumber = ?, testDate = ?, orderedBy = ?, testResult = ?, labTestImages = ?, WHERE healthCardNumber = ?';
        let param = [body.labNumber, body.testDate, body.orderedBy, body.testResult, body.labTestImages]
        await db.query(sql, param);
        return res.status(200).send({ message: 'Successfully updated' })
    } else {
        return res.status(404).send({ message: 'No results found' }) 
    }
})

export default router