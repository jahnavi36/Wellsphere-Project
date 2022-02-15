require('dotenv').config()
import express from 'express'
import * as db from './database.js'
import * as jwtGenerator from 'jsonwebtoken'


const router = express.Router();

router.post('/', async (req, res) => {
    let email = req.body.username
    let sql = 'SELECT * FROM careProvider WHERE email = ?';
    let user = await db.query(sql, email)
    console.log(user[0].password == req.body.password)
    if (user.length > 0) {
        if (user[0].password == req.body.password) {
            
            const token = jwtGenerator.sign({email}, process.env.JWT_SECRET, {expiresIn: '10m'})
            const payload = {
                userID: user[0].userId,
                email: user[0].email,
                firstName: user[0].firstName,
                lastName: user[0].lastName ,
                phoneNumber:user[0].phoneNumber,
                hospital:user[0].hospital,
                permissions:user[0].permissions,
                token: token
            }
            res.status(200).send(payload)
        } else {
            return res.status(401).send({message: `Incorrect credentials`});
        }
        
    } else
        return res.status(401).send({message: `Incorrect credentials`});
})


export default router