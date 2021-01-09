const request = require('supertest');
const app = require('../../app');


it('Should create new ticket', async ()=>{
    await global.createTicket(); 

});

it('Should fail when required fields are not pass', async ()=>{
    try {
        await request(app)
        .post('/ticket/create')
        .send({
              "vehicleRegistrationNumber": "1234"
          }) 
         .expect(400);   
    } catch (error) {
            console.log(error);
    }
}, 30000);


it('Should validate and expect ticket to be valid', async ()=>{
    let {_id: ticketId} = await global.createTicket(); 
    await request(app)
          .get('/ticket/validate')
          .send({
                "ticketId": ticketId
            }) 
           .expect(200);
});

it('Should show ticket is not valid', async ()=>{

    await request(app)
          .get('/ticket')
          .send({
                "ticketId": "123456"
            }) 
           .expect(400);
});

it('Should validate and expect ticket to be invalid', async ()=>{
    let {_id: ticketId} = await global.createTicket(); 
    await request(app)
          .get('/ticket/validate')
          .send({
                "ticketId": ticketId
            }) 
           .expect(200);
});