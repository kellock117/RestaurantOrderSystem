import express from "express"
import cors from "cors"
import MainRouter from "./api/main.route.js"
import Path from "path"
import BodyParser from "body-parser"
const __dirname = Path.resolve()

const app = express()

//basic set up for server
app.use(BodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())

//use MainRouter for main page and suburl 
app.use("/", MainRouter)

//if undefined url is passed return 404 status code
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app