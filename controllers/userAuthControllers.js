const User = require('../modals/user');
const bcrypt = require('bcryptjs');

const user_signin_post = (req, res) => {
    const { email, pass } = req.body;
    User.findOne({ email })
        .then((response) => {
            if (response) {
                bcrypt.compare(pass, response.password, (err, result) => {
                    if (err) return res.status(500).json({ status: 'error', message: 'Server error' });
                    if (result === true) {
                        const filteredUser = {
                            _id: response._id,
                            email: response.email,
                        };
                        res.json({ status: 'success', message: 'Login done successfully!' });
                    } else {
                        res.json({ status: 'error', message: 'Wrong Password' });
                    }
                });
            } else {
                res.json({ status: 'error', message: 'No Account With This Email.' });
            }
        })
        .catch(err => res.status(500).json({ status: 'error', message: 'Server error' }));
};


const user_signup_post = (req, res) => {
    const { email, pass } = req.body;

    User.findOne({ email })
        .then(async (response) => {
            if (response) {
                res.json({ status: 'error', message: 'Email already exists' });
            } else {

                // Giving password salt and then hash it
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(pass, salt);
                // Create the account
                await User.create({
                    email,
                    password: hashedPassword,
                }).then(() => res.json({ message: 'User Created', status: 'success' }));
            }
        })
        .catch((error) => res.status(500).send({ message: error }));
};

module.exports = {
    user_signin_post,
    user_signup_post
}