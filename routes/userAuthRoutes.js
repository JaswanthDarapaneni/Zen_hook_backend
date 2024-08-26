const { Router } = require('express');

const localAuthControllers = require('../controllers/userAuthControllers');


const router = Router();

router.post('/signin', localAuthControllers.user_signin_post);
router.post('/register', localAuthControllers.user_signup_post);

module.exports = router;
