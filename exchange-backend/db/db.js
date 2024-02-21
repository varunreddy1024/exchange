const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb+srv://varunreddybokka12:VarunReddy%40135@cluster0.wggzk4x.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
        throw error;
    }
};

module.exports = connectDB;