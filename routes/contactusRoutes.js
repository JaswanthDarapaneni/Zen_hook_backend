const { Router } = require('express');

const sendMail = require('../controllers/mailsend');


const router = Router();

router.post('/email', sendMail.sendMail);
router.post('/organization', sendMail.organizationSendMail);

module.exports = router;


