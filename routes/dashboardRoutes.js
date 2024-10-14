import dashboardController from "../controller/dashboardController";
import express from "express";

export const dashboardRouter = express.Router();
dashboardController.get('/getAIOCount', dashboardController.getAIOCount);
dashboardController.get('/getCPUCount', dashboardController.getCPUCount);
dashboardController.get('/getKeyboardCount', dashboardController.getKeyboardCount);
dashboardController.get('/getMonitorCount', dashboardController.getMonitorCount);
dashboardController.get('/getMouseCount', dashboardController.getMouseCount);


