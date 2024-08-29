import express from 'express';
import userController from '../controller/userController.js';
export const userRouter = express.Router();


userRouter.post('/userRegistration', userController.userRegistration);
userRouter.get('/getUsers', userController.getUsers);
userRouter.get('/getUser/:userID', userController.getUser);
userRouter.put('/updateUser/:userID', userController.updateUser);
userRouter.delete('/deleteUser/:userID', userController.deleteUser);


