const express = require('express')
const userRouter = require('./routes/userRoutes')
const app = express();
const mongoose = require('mongoose');
const itemRouter = require('./routes/itemRoutes');
const cors = require('cors');
const Item = require('./model/Item');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DATABASE CONNECTED')
}).catch((error)=>{
    console.log('ERROR:',error.message)
})

const corsOption = {
    origin: ["http://localhost:3000"]
}

app.use(cors(corsOption))
app.use(express.json())

app.use('/', userRouter)
app.use('/', itemRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Listening to server on port:${process.env.PORT}`)
})