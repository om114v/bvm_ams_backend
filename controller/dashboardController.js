import { productModel } from "../models/product";



class dashboardController {
    static getAIOCount = async (req, res) => {
        try {
            const products = (await productModel.find({ productCategory: "All-In-One" })).length;
            return res.success(201, "All AIOs found successfully.", products);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }

    static getMonitorCount = async (req, res) => {
        try {
            const products = (await productModel.find({ productCategory: "Monitor" })).length;
            return res.success(201, "All Monitors found successfully.", products);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getMouseCount = async (req, res) => {
        try {
            const products = (await productModel.find({ productCategory: "Mouse" })).length;
            return res.success(201, "All Mouse found successfully.", products);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getKeyboardCount = async (req, res) => {
        try {
            const products = (await productModel.find({ productCategory: "Keyboard" })).length;
            return res.success(201, "All Keyboard found successfully.", products);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getCPUCount = async (req, res) => {
        try {
            const products = (await productModel.find({ productCategory: "CPU" })).length;
            return res.success(201, "All CPU found successfully.", products);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
}

export default dashboardController;