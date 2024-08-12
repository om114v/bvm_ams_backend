import express from "express";
import { checkAuth } from "../middleware/authmiddleware.js";
import { userRouter } from "./userRoutes.js";
import { orderRouter } from "./orderRoutes.js";
import userController from "../controller/userController.js";

export const router = express.Router();

router.post('/api/user/userLogin', userController.userLogin);
router.use(checkAuth)
router.use("/api/user", userRouter);
router.use("/api/order", orderRouter);
