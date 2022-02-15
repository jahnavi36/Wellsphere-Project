require('dotenv').config()
import express from 'express';
import * as db from './database.js';

const router = express.Router();


// validation for doctor information

const doctorValidation = () => {
    return (req, res, next) => {

        // check for missing attributes
        let expectedAttributes = ['userID', 'password', 'firstName', 'lastName', 'phoneNumber', 'email', 'hospital', 'permissions'];
        let userAttributes = Object.keys(req.body);
        let errors = expectedAttributes.filter(attr => !userAttributes.includes(attr))

        
        // check for valid user ID and if userID is a missing attribute
        // if (userAttributes.indexOf('userID') > -1) {
        //     let userMatchPattern = new RegExp("^\\d{9}$");
        //     let userID = req.body.userID;
        //     if (!userID.match(userMatchPattern)) {
        //         errors.push('userID');
        //     }
        // }

        /*// check phone number for 10 digits and if it is a missing attribute
        if (userAttributes.indexOf('phoneNumber') > -1) {
            let phoneDigits = new RegExp("^\\d{10}$");
            let phone = req.body.phone;
            if (!phone.match(phoneDigits)) {
                errors.push('phoneNumber');
            }
        }
        bizarre phone number error that doesn't allow me to post here
        */

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

// creating care provider
router.post('/', doctorValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM careProvider WHERE userID = ?';
    let careProvider = await db.query(sql, body.userID);

    if(careProvider.length === 0) {
        sql = 'INSERT INTO careProvider (userID, password, firstName, lastName, phoneNumber, email, hospital, permissions) VALUES (?,?,?,?,?,?,?,?)';
        let param = [body.userID, body.password, body.firstName, body.lastName, body.phoneNumber, body.email, body.hospital, body.permissions]
        await db.query(sql, param);
        return res.status(201).send({ message: 'Care Provider successfully created' })
    } else {
        return res.status(400).send({message: 'Care Provider already exists'})
    }
})

// retrieving info by Care Provider userID

router.get ('/search/:id', async (req, res) => {
    let param = req.params.id;
    let sql = "SELECT * FROM careProvider WHERE userID = ? AND permissions <> 'admin'";
    
    
    let careProviderData = await db.query(sql, param);
    if (careProviderData.length > 0) {
        return res.status(200).send(careProviderData);
    } else {
        return res.status(404).send({ message: 'No results found' })
    }
})

// updating care provider

router.patch('/', doctorValidation(), async (req, res) => {
    let body = req.body
    let sql = 'SELECT * FROM careProvider WHERE userID = ?'
    let careProvider = await db.query(sql, body.userID)

    if (careProvider.length > 0) {
        sql = 'UPDATE careProvider SET password = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, hospital = ?, permissions = ? WHERE userID = ?';
        let param = [body.password, body.firstName, body.lastName, body.phoneNumber, body.email, body.hospital, body.permissions, body.userID]
        await db.query(sql, param);
        return res.status(200).send({ message: 'Successfully updated' })
    } else {
        return res.status(404).send({ message: 'No doctor found' });
    }
})

router.delete('/:id', async (req,res) => {
    let param = req.params.id;
    let sql = 'DELETE FROM careProvider WHERE userID = ?'
    await db.query(sql, param)
    return res.status(200).status({message: 'Successfully deleted'})
})

export default router