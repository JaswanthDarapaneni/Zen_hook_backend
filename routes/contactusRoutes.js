const { Router } = require('express');

const sendMail = require('../controllers/mailsend');


const router = Router();

router.post('/email', sendMail.sendMail);

module.exports = router;


