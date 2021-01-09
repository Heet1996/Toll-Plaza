const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

let mongo=""
beforeAll(async ()=>{
    mongo= new MongoMemoryServer();
    const mongoUri= await mongo.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async ()=>{
     
    const collections= await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
})

afterAll(async ()=>{
    mongo.stop();
    await mongoose.disconnect();
})

global.createTicket = async ()=>{
    let response= await request(app)
          .post('/ticket/create')
          .send({
                "vehicleRegistrationNumber": "1234",
                "type":"single"
            }) 
          .expect(200);  
    const ticket= response.body;
    return ticket;         
}
