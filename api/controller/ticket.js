


const message = require('../const/message');
const Ticket = require('../models/ticket');
const BadRequestError= require('../helper/BadRequestError');
const ObjectId = require('mongoose').Types.ObjectId;

exports.create = async (req, res, next)=>{

    try{
        const {vehicleRegistrationNumber, type} = req.body;
        if(!vehicleRegistrationNumber || !type)
        throw new BadRequestError(message.requiredFields);
        let ticket = new Ticket({vehicleRegistrationNumber, type});
        await ticket.save();
        res.status(200).send(ticket);
    }catch(error){
        next(error);
    }
}

exports.get = async (req, res, next)=>{

    try{
        const {ticketId} = req.body;
        if(!ticketId)
        throw new BadRequestError(message.requiredFields);
        if(!ObjectId.isValid(ticketId))
        throw new BadRequestError(message.ticketNotValid);
        let ticket= await Ticket.findById(ticketId);
        if(ticket)
        res.status(200).send(ticket);
        else res.staus(204).send(message.ticketNotFound);
    }catch(error){
        next(error);
    }
}

exports.validate = async (req, res, next)=>{

    try{
        const {ticketId} = req.body;
        if(!ticketId)
        throw new BadRequestError(message.requiredFields);
        if(!ObjectId.isValid(ticketId))
        throw new BadRequestError(message.ticketNotValid);
        let ticket= await Ticket.findById(ticketId);
        if(!ticket)
        res.staus(204).send(message.ticketNotFound);

        const currentDate= new Date().toLocaleDateString();
        const receiptDate = new Date(ticket._id.getTimestamp()).toLocaleDateString();

        if(currentDate === receiptDate)
        res.status(200).send(message.ticketIsValid);
        else res.status(200).send(message.ticketNotValid);

    }catch(error){
        next(error);
    }
}

