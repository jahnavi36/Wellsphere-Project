require('dotenv').config()
import express from 'express'
import * as db from './database.js'
import jwt from 'express-jwt'

const router = express.Router();

//validation for healthCard
const healthCardValidation = () => {
    return (req, res, next) => {
        
        let healthCardPattern = new RegExp("^\\d{9}$");
        let healthCard = req.body.healthCardNumber;
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

router.post('/', async (req, res) => {
    let body = req.body
    let sql = 'INSERT INTO notes (healthCardNumber, userID, note) VALUES (?,?,?)';
    let param = [body.healthCardNumber, body.userID, body.note];
    await db.query(sql, param);
    return res.status(201).send({ message: 'Note successfully created' })
})

router.get('/:id', async (req, res) => {
    let sql = 'SELECT * FROM notes WHERE healthCardNumber = ? ORDER BY date desc';
    let patientNotes = await db.query(sql, req.params.id);
    if (patientNotes.length > 0) {
        return res.send(patientNotes);
    } else
        return res.status(404).send({ message: `${req.params.id} not found` })
})

export default router