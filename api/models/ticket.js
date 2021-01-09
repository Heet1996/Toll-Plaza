const mongoose= require('mongoose');

const ticketSchema = new  mongoose.Schema({
    vehicleRegistrationNumber:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);