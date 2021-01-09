const express = require("express");
const app = express();

const BadRequestError = require('./helper/BadRequestError.js');
const ticketRoute = require('./routes/ticket');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ticket", ticketRoute);

app.use((req, res)=>res.status(404).send("Route not found"));

app.use((err, req, res, next)=>{
    if(err instanceof BadRequestError){
        err.handleErrorMessage(req, res);
    }else{
        res.status(500).send('Internal server Error');
    }
})

module.exports= app;
