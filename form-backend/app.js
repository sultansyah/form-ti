import dotenv from "dotenv"
import express from "express"
import apiRouter from "./routes/api.js"
import connection from "./connection.js"

const env = dotenv.config().parsed
const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


app.use("/", apiRouter)

// catch and error handle when someone opens a page that doesn't exist
app.use((req, res) => {
    res.status(404).json({message: "404_NOT_FOUND"})
})

// MongoDB Connection
connection()


app.listen(env.APP_PORT, () => {
    console.log('Server started on port 3000')
})