import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dayjs from "dayjs"
import { MongoClient } from "mongodb"
import joi from "joi"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000


const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db

try {
    await mongoClient.connect();
    db = mongoClient.db()
    console.log('MongoDB Connected!')
} catch (err) {
    console.log(err.message)
}


app.post('/participants', async (req, res) => {

    const name = req.body

    const lastStatus = Date.now()

    const time = dayjs().format("HH:mm:ss")

    const nameSchema = joi.object({
        name: joi.string().required()
    })


    const validation = nameSchema.validate(name, { abortEarly: false })

    if (validation.error) {
        return res.sendStatus(422)
    }

    try {
        const alreadyExist = await db.collection("participants").findOne({name:name.name})

        if (alreadyExist) return res.sendStatus(409)

        await db.collection("participants").insertOne(
            {

                name: name.name,
                lastStatus: lastStatus

            }
        )

        await db.collection("messages").insertOne(
            {
                from: name.name,
                to: 'Todos',
                text: 'entra na sala...',
                type: 'status',
                time: time
            }
        )


        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message)

    }


})

app.get('/participants', async (req, res) => {

    try {
        const participantsList = await db.collection("participants").find().toArray()

        res.send(participantsList)
    } catch (err) {
        return res.status(500).send(err.message)
    }


})

app.post('/messages', async (req, res) => {

    /* const { to, text, type } = req.body

    const from = req.header

    const nameSchema = joi.object(
        {
            to: joi.string().required(),
            text: joi.string().required(),
            type: joi.string().valid("message", "private_message").required()
        }

    )

    const validation = nameSchema.validate({ to, text, type }, { abortEarly: false })

    if (validation.error) {
        return res.sendStatus(422)
    }

    try {
        const alreadyExist = await db.collection("message").findOne({ from })

        if (alreadyExist) return res.sendStatus(409)

        await db.collection("participants").insertOne(
            {

                

            }
        )

        await db.collection("messages").insertOne(
            {
                
            }
        )


        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message)

    } */

    

})

app.get('/messages', async (req, res) => {


})

app.post('/status', async (req, res) => {


})



app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
    console.log("testing")
})