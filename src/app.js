import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000


const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db

try {
    await mongoClient.connect();
    console.log('MongoDB Connected!')
} catch (err) {
    console.log(err.message)
}

db = mongoClient.db()
const participants = db.collection("participants");
const messages = db.collection("messages");

app.post('/participants' , async (req, res) => {


})

app.get('/participants' , async (req, res) => {

    
})

app.post('/messages' , async (req, res) => {

    
})

app.get('/messages' , async (req, res) => {

    
})

app.post('/status' , async (req, res) => {

    
})



app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
    console.log("testing")
})