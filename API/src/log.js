require('dotenv').config()
import express from 'express'
import * as db from './database.js'


const router = express.Router();

router.post('/', async (req, res) => {
    let body = req.body
    let sql = 'INSERT INTO log (healthCardNumber, attribute, userID) VALUES (?,?,?)';
    let param = [body.healthCardNumber, body.attribute, body.userID]
    await db.query(sql, param);
    return res.status(201).send({ message: 'Log successfully created' })
})

router.get('/:id', async (req,res) =>{
    let sql = "select DATE_FORMAT(log.date, '%M %d, %Y %H:%i') as date , careProvider.firstName, careProvider.lastName, log.attribute from log left join careProvider on log.userID = careProvider.userID where log.healthCardNumber = ? order by date desc"
    let logData = await db.query(sql, req.params.id)
    if(logData.length > 0){
        return res.status(200).send(logData);
    } else {
        return res.status(404)
    }
})

export default router