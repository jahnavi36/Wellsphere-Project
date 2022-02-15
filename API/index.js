require('dotenv').config()
import express from 'express'
import cors from 'cors'
import patient from './src/patientdata.js'
import notes from './src/notes.js'
import billing from './src/billing.js'
import careProvider from './src/careProviderData.js'
import labData from './src/labData.js'
import medicationData from './src/medicationData.js'
import auth from './src/auth.js'
import log from './src/log.js'

const app = express()
const port = process.env.PORT || 3000;
app.use(cors())

app.use(express.json());

app.use('/patient', patient)
app.use('/notes', notes)
app.use('/billing', billing)
app.use('/careProvider', careProvider)
app.use('/labData', labData)
app.use('/medicationData', medicationData)
app.use('/log', log)
app.use('/auth', auth)

export default app.listen(port, ()=> console.log(`Server running on port ${port}`));