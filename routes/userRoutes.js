import express from 'express';
import userController from '../controller/userController.js';
export const userRouter = express.Router();


userRouter.post('/userRegistration', userController.userRegistration);
