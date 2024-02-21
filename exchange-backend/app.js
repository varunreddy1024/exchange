const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');
const negotiationsRouter = require('./routes/negotiations');
const messagesRouter = require('./routes/messages');
const authRouter = require('./routes/users'); // Import your authentication route
const connectDB = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.json({ limit: '50mb' }));
// app.use(express.bodyParser({ limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Use the routers
app.use('/auth', authRouter); // Mount authentication route
app.use('/api', itemsRouter);
app.use('/api', negotiationsRouter);
app.use('/api', messagesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});