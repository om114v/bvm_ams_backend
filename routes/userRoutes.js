import express from 'express';
import { loginUser, registerUser } from '../controller/userController.js';
export const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
