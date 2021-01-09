import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import { Request, Response } from 'express';
import cors from "cors";
import { registerMidd } from "./src/middlewares/auth.middleware";
import { AuthController } from "./src/controller/AuthController";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";
import { UpdateUserRoute } from "./src/routes/UpdateUserRoute";
const path = require('path');

config(); //process.env

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})
app.use('/user', UpdateUserRoute);
app.use('/auth', AuthentificationRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
});