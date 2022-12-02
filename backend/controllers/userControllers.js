import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

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
    res.status(400);
    throw new Error('User already exists');
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
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    });
  } else {
    // Compare user password to the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user._id);

      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid user credentials');
    }
  }
});

export { getUsers, registerUser, loginUser };
