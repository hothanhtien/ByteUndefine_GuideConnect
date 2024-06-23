import express from 'express'
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

import router from'./apis/index';

import db from './database/database.config'
//connect db
db.connect();

app.use(express.urlencoded());
app.use(express.json())

app.use('/apis', router)




app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
