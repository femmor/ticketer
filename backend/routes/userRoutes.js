import express from 'express';
import {
  loginUser,
  getUsers,
  registerUser,
} from '../controllers/userControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
