const User = require('../modals/user');
const bcrypt = require('bcryptjs');

const user_signin_post = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((response) => {
            if (response) {
                bcrypt.compare(password, response.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        const filteredUser = {
                            _id: response._id,
                            email: response.email,
                        };
                        res.json({status: 'success', message: 'Login done successfully!'});
                    } else {
                        res.status(401).send('Wrong Password');
                    }
                });
            } else {
                res.json({ message: 'No Account With This Email.'});
            }
        });
};

const user_signup_post = (req, res) => {
    const { email, password, fullName } = req.body;

    User.findOne({ email })
        .then(async (response) => {
            if (response) {
                res.status(400).send('Email already exists');
            } else {

                // Giving password salt and then hash it
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                // Create the account
                await User.create({
                    email,
                    password: hashedPassword,
                }).then(() => res.status(201).send({ message: 'User Created', status: 'success' }));
            }
        })
        .catch((error) => res.status(500).send({ message: error }));
};

module.exports = {
    user_signin_post,
    user_signup_post
}