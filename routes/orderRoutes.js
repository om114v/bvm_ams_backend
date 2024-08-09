import express from "express";
import orderController from "../controller/orderController.js";

export const orderRouter = express.Router();

orderRouter.post('/addOrder', orderController.addOrder);