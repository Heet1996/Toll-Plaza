const app = require('express');
const router = app.Router();
const ticketController = require('../controller/ticket');

router.get('/', ticketController.get);
router.post('/create', ticketController.create);
router.get('/validate', ticketController.validate);

module.exports=router;