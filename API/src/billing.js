require('dotenv').config()
import express from 'express'
import * as db from './database.js'
import jwt from 'express-jwt'

const router = express.Router();

const invoiceValidation = () => {
    return (req, res, next) => {
        let invoiceNum = req.body.invoiceNumber
        console.log(typeof invoiceNum)
        if (typeof invoiceNum !== 'number') {
            return res.status(400).send({ message: 'invalid invoice number'})
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

router.post('/', async (req, res) => {
    let body = req.body;
    //excluded invoiceNumber as its sequential
    let sql = 'INSERT INTO billing (healthCardNumber, invoiceDate, invoiceFrom, description, amount) VALUES (?,?,?,?,?)'
    let param = [body.healthCardNumber, body.invoiceDate, body.invoiceFrom, body.description, body.amount];
    await db.query(sql, param)
    res.status(201).send({ message: 'Invoice successfully created' })
})

router.get('/:id', invoiceValidation(), async (req, res) => {
    let sql = 'SELECT * FROM billing WHERE invoiceNumber = ?';
    let invoice = await db.query(sql, req.params.id)
    
    if (invoice.length > 0) {
        return res.send(invoice);
    } else
        return res.status(404).send({ message: `Invoice #${req.params.id} not found` })
})

router.patch('/', async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM billing WHERE invoiceNumber = ?'
    let invoice = await db.query(sql, body.invoiceNumber)

    if (invoice.length > 0) {
        sql = 'UPDATE billing SET healthCardNumber = ?, invoiceDate = ?, invoiceFrom = ?, description = ?, amount = ? WHERE invoiceNumber = ?';
        let param = [body.healthCardNumber, body.invoiceDate, body.invoiceFrom, body.description, body.amount, body.invoiceNumber]
        await db.query(sql, param);
        return res.status(200).send({ message: 'Successfully updated' })
    } else {
        return res.status(404).send({ message: 'No invoice found' });
    }
})

export default router