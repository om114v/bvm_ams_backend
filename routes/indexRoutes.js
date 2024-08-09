import express from "express";
import { checkAuth } from "../middleware/authmiddleware.js";
import { userRouter } from "./userRoutes.js";
import { orderRouter } from "./orderRoutes.js";

export const router = express.Router();

router.use(checkAuth)
router.use("/api/user", userRouter);
router.use("/api/order", orderRouter);
