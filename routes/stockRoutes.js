import express from "express";
import stockController from "../controller/stockController.js";

export const stockRouter = express.Router();

stockRouter.post('/addStock', stockController.addStock);
stockRouter.get('/getStocks', stockController.getStocks);
stockRouter.put('/updateStock/:stockID', stockController.updateStock);
stockRouter.get('/getStock/:stockID', stockController.getStock);
stockRouter.delete('/deleteStock/:stockID', stockController.deleteStock);
