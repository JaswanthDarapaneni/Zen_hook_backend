const sendMail = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS
        }
    });

    if (!name || !email || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }

    const mailOptions = {
        from: email,
        to: process.env.ZEN_HOOK_EMAIL, // The email address where you want to receive the messages
        subject: subject,
        text: contactUsEmailFormate(name, email, subject, message)
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.json({ status: 'success', message: 'Email sent successfully!' });
    });
}

const contactUsEmailFormate = (name, email, subject, message) => {
    return `
<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                }
                h2 {
                    color: #0056b3;
                }
                p {
                    line-height: 1.6;
                }
                .highlight {
                    color: #555555;
                    font-weight: bold;
                }
                .divider {
                    border-top: 1px solid #eeeeee;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 0.8em;
                    color: #777777;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Contact Form Submission</h2>
                <p><span class="highlight">Name:</span> ${name}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Subject:</span> ${subject}</p>
                <div class="divider"></div>
                <p><span class="highlight">Message:</span></p>
                <p>${message}</p>
            </div>
        </body>
        </html>
        `
}

module.exports = {
    sendMail
}