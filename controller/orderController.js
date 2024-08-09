import mongoose from "mongoose";
import { orderModel } from "../models/order.js";

class orderController {
    static addOrder = async (req, res) => {
        const session = await mongoose.startSession();
        const { orderNo, specification, purchaseDate, orderDate, unitPrice, quantity, totalPrice, cgst, sgst } = req.body;
        try {
            session.startTransaction();
            if (orderNo && specification && purchaseDate && orderDate && unitPrice && quantity && totalPrice && cgst && sgst) {
                const newOrder = new orderModel({
                    orderNo: orderNo,
                    specification: specification,
                    purchaseDate: purchaseDate,
                    orderDate: orderDate,
                    unitPrice: unitPrice,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    cgst: cgst,
                    sgst: sgst
                });
                const order = await newOrder.save(session);
                await session.commitTransaction();
                return res.success(201, "New order added successfully.", order);
            } else {
                return res.error(400, "Fill all the details please...!", null);
            }
        } catch (error) {
            session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession()
        }
    };

}


export default orderController;