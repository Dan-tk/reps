require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const workoutRoutes = require("./routes/workoutRoutes")

//express app
const app=express()

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

//routes
app.use('/api/workouts', workoutRoutes)

//connect to DB 
mongoose.connect(process.env.MONGO_URL)
   .then(()=>{
    console.log("database connected successfully")
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log('listening on port', process.env.PORT)
    })
   })
   .catch ((error) =>{
    console.log(error)
   })
    



