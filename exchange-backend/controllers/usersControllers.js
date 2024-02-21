// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            // The user or password is incorrect
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, '123456789', { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.registerUser = async(req, res) => {
    try {
        const { username, email, password, phoneNumber, verifiedPhoneNumber, address, country, state, city, pincode } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Check if the username is already registered
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            verifiedPhoneNumber,
            address,
            country,
            state,
            city,
            pincode,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, '123456789', { expiresIn: '1h' });

        // Send the token in the response
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getUserProfile = async(req, res) => {
    try {
        // Fetch user profile details excluding sensitive information like password
        const userProfile = await User.findById(req.userId).select('-password');
        res.json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserProfile = async(req, res) => {
    try {
        const { userId } = req;
        const updatedProfile = req.body;

        // Update the user profile
        await User.findByIdAndUpdate(userId, updatedProfile);

        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};