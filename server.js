require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userAuthRoutes = require('./routes/userAuthRoutes');
const contactusRoutes = require('./routes/contactusRoutes')

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
    credentials: true,
};

app.use(cors(corsOptions));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render static files
app.use(express.static(path.join(__dirname, 'public', 'Contact')));

app.use('/api/auth', userAuthRoutes);
app.use('/api/send', contactusRoutes);


//  get the index file when application load
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Contact', 'index.html'));
});


// Connect mongoose and start
mongoose.connect(process.env.URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((error) => console.log('MongoDB connection error:', error));

