import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUsers = asyncHandler(async (req, res) => {
  res.json('Get users controller');
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate the name, email and password
  if (!name || !email || !password) {
    res.status(400).json({
      message: 'Please fill in all the fields',
    });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: 'User already exists',
    });
  } else {
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Check if the user was created successfully
    if (newUser) {
      res.status(201).json({
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: generateToken(newUser._id),
        },
        message: 'User created successfully',
      });
    } else {
      res.status(400).json({
        message: 'Invalid user data',
      });
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.json('Login user controller');
});

// Generate token
const generateToken = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export { getUsers, registerUser, loginUser };
