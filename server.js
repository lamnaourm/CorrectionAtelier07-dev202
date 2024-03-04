import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.js'

dotenv.config()
const port = process.env.PORT;
const url = process.env.URL_MONGOOSE;

const app = express()
app.use(express.json())
app.use('/', userRoute);

mongoose.connect(url)
    .then(() => {
        console.log('Connect to Mongo')
    })
    .catch((err) => {
        console.log('Unable to connect to Mongo')
    })


app.listen(port, (err) => {
    if(!err)
        console.log('Server started')
    else 
        console.log('Unable to start Server')
})




