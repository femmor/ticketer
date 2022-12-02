import asyncHandler from 'express-async-handler';

const getUsers = asyncHandler(async (req, res) => {
  res.json('Get users controller');
});

const registerUser = asyncHandler(async (req, res) => {
  res.json('Register user controller');
});

const loginUser = asyncHandler(async (req, res) => {
  res.json('Login user controller');
});

export { getUsers, registerUser, loginUser };
