import express from 'express'
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

import route from'./routers/indexRouter.js';

import db from './config/db'
//connect db
db.connect();

app.use(express.urlencoded());
app.use(express.json())

route(app);




app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
