import mongoose from 'mongoose';
import xlsx from "xlsx";
import fs from "fs";
import products from '../models/product.js';

const {
    productModel,
    allInOneModel,
    cpuModel,
    monitorModel,
    mouseModel,
    keyboardModel
} = products;

class productController {
    static addProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const {
            productId,
            productName,
            type, // type is the discriminator (e.g., "AllInOne", "CPU", etc.)
            model,
            purchaseDate,
            specification,
            location,
            processor, // For "AllInOne" and "CPU"
            generations, // For "AllInOne" and "CPU"
            cores, // For "AllInOne" and "CPU"
            l3Cache, // For "AllInOne" and "CPU"
            threads, // For "AllInOne" and "CPU"
            baseClockSpeed, // For "AllInOne" and "CPU"
            turboClockSpeed, // For "AllInOne" and "CPU"
            power, // For "AllInOne" and "CPU"
            ram, // Array for "AllInOne" and "CPU"
            totalRam, // For "AllInOne" and "CPU"
            hdd, // Array for "AllInOne" and "CPU"
            totalHdd, // For "AllInOne" and "CPU"
            ssd, // Array for "AllInOne" and "CPU"
            totalSsd, // For "AllInOne" and "CPU"
            graphicsCard, // Array for "AllInOne" and "CPU"
            screenType, // For "AllInOne" and "Monitor"
            mouseType, // For "Mouse"
            keyboardType, // For "Keyboard"
            motherBoard // For "CPU"
        } = req.body;

        try {
            session.startTransaction();
            const product = await productModel.findOne({ productId: productId, productName: productName });
            if (product) {
                throw new Error("Product already exists...!");
            }
            if (type === "Mouse") {
                if (productId && productName && type && specification && model && location && purchaseDate && mouseType) {
                    const newProduct = new mouseModel({
                        productId,
                        productName,
                        type: "Mouse",
                        specification,
                        model,
                        location,
                        purchaseDate,
                        mouseType
                    });
                    const savedProduct = await newProduct.save({ session });
                    await session.commitTransaction();
                    return res.success(201, "New mouse added successfully.", savedProduct);
                } else {
                    throw new Error("Please fill all the required details...!");
                }
            } else if (type === "Keyboard") {
                if (productId && productName && type && specification && model && location && purchaseDate && keyboardType) {
                    const newProduct = new keyboardModel({
                        productId,
                        productName,
                        type: "Keyboard",
                        specification,
                        model,
                        location,
                        purchaseDate,
                        keyboardType
                    });
                    const savedProduct = await newProduct.save({ session });
                    await session.commitTransaction();
                    return res.success(201, "New keyboard added successfully.", savedProduct);
                } else {
                    throw new Error("Please fill all the required details...!");
                }
            } else if (type === "AllInOne") {
                if (productId && productName && type && specification && model && location && purchaseDate &&
                    processor && generations && cores && l3Cache && threads && baseClockSpeed && turboClockSpeed && power &&
                    ram && totalRam && hdd && totalHdd && ssd && totalSsd && graphicsCard && screenType) {

                    const newProduct = new allInOneModel({
                        productId,
                        productName,
                        type: "AllInOne",
                        specification,
                        model,
                        location,
                        purchaseDate,
                        processor,
                        generations,
                        cores,
                        l3Cache,
                        threads,
                        baseClockSpeed,
                        turboClockSpeed,
                        power,
                        ram,
                        totalRam,
                        hdd,
                        totalHdd,
                        ssd,
                        totalSsd,
                        graphicsCard,
                        screenType
                    });
                    const savedProduct = await newProduct.save({ session });
                    await session.commitTransaction();
                    return res.success(201, "New All-in-One added successfully.", savedProduct);
                } else {
                    throw new Error("Please fill all the required details...!");
                }
            } else if (type === "CPU") {
                if (productId && productName && type && specification && model && location && purchaseDate &&
                    processor && generations && cores && l3Cache && threads && baseClockSpeed && turboClockSpeed && power &&
                    ram && totalRam && hdd && totalHdd && ssd && totalSsd && graphicsCard && motherBoard) {

                    const newProduct = new cpuModel({
                        productId,
                        productName,
                        type: "CPU",
                        specification,
                        model,
                        location,
                        purchaseDate,
                        processor,
                        generations,
                        cores,
                        l3Cache,
                        threads,
                        baseClockSpeed,
                        turboClockSpeed,
                        power,
                        ram,
                        totalRam,
                        hdd,
                        totalHdd,
                        ssd,
                        totalSsd,
                        graphicsCard,
                        motherBoard
                    });
                    const savedProduct = await newProduct.save({ session });
                    await session.commitTransaction();
                    return res.success(201, "New CPU added successfully.", savedProduct);
                } else {
                    throw new Error("Please fill all the required details...!");
                }
            } else if (type === "Monitor") {
                if (productId && productName && type && specification && model && location && purchaseDate && screenType) {
                    const newProduct = new monitorModel({
                        productId,
                        productName,
                        type: "Monitor",
                        specification,
                        model,
                        location,
                        purchaseDate,
                        screenType
                    });
                    const savedProduct = await newProduct.save({ session });
                    await session.commitTransaction();
                    return res.success(201, "New monitor added successfully.", savedProduct);
                } else {
                    throw new Error("Please fill all the required details...!");
                }
            } else {
                return res.error(400, "Invalid product type.", null);
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static getProducts = async (req, res) => {
        try {
            const type = req.params.type;
            const products = await productModel.find({ type: type });
            return res.success(200, "All products found successfully.", products);
        } catch (error) {
            console.log("Error fetching products: " + error);
            return res.error(400, error, null);
        }
    }

    static getProduct = async (req, res) => {
        const productId = req.params.productId;
        try {
            const product = await productModel.findOne({ productId: productId });
            if (!product) {
                throw new Error("Product not found...!");
            }
            return res.success(200, "Product found successfully.", product);
        } catch (error) {
            console.log("Error fetching product: " + error);
            return res.error(400, error, null);
        }
    }

    static updateProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const productId = req.params.productId;
        const { productName, productCategory, specification, location } = req.body;
        try {
            session.startTransaction();
            const product = await productModel.findOne({ productId: productId });
            if (!product) {
                throw new Error("Product not found...!");
            }
            if (productName && productCategory && specification && location) {
                const updatedProduct = await productModel.updateOne(
                    { productId: productId },
                    {
                        $set: {
                            productName,
                            productCategory,
                            specification,
                            location
                        },
                    },
                    { session }
                );
                await session.commitTransaction();
                return res.success(200, "Product updated successfully.", updatedProduct);
            } else {
                throw new Error("Please fill all the required details...!");
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static deleteProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const productId = req.params.productId;
        try {
            session.startTransaction();
            const product = await productModel.findOne({ productId: productId });
            if (!product) {
                return res.error(404, "Product not found for this Id.", null);
            }
            const deletion = await productModel.deleteOne({ productId: productId }, { session });
            await session.commitTransaction();
            return res.success(200, "Product deleted successfully.", deletion);
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };
    static addProductByExcel = async (req, res) => {
        if (!req.file) {
            return res.error(400, "File required...!", null);
        }
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            // Read the Excel file
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);

            const addedData = [];
            const errors = [];

            for (let row of data) {
                const { productId, productName, productCategory, specification, location } = row;
                try {
                    const updatedProduct = await productModel.updateOne(
                        { productId: productId },
                        {
                            $set: {
                                productName: productName,
                                productCategory: productCategory,
                                specification: specification,
                                location: location
                            },
                        },
                        { upsert: true, session }
                    );
                    if (updatedProduct.modifiedCount > 0) {
                        addedData.push({ [productId]: `Modified ${updatedProduct.modifiedCount}` });
                    } else if (updatedProduct.upsertedCount > 0) {
                        addedData.push({ [productId]: `Upserted ${updatedProduct.upsertedCount}` });
                    } else {
                        addedData.push({ [productId]: `Matched ${updatedProduct.matchedCount}` });
                    }
                } catch (error) {
                    console.log(error);
                    errors.push({ [productId]: error.message });
                }
            }

            await session.commitTransaction();
            return res.success(201, "Products added successfully",
                {
                    addedCount: addedData.length,
                    failedCount: errors.length,
                    addedProduct: addedData,
                    failedProducts: errors
                });
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            fs.unlinkSync(req.file.path);
            session.endSession();
        }
    };
    static getProductGroups = async (req, res) => {
        try {
            const pipeline = [
                {
                    $group: {
                        _id: {
                            productName: "$productName",
                            productCategory: "$productCategory",
                            specification: "$specification"
                        },
                        productIds: { $addToSet: "$productId" }, // Collect unique product IDs
                        count: { $sum: 1 } // Optional: count the number of products in the group
                    }
                },
                {
                    $project: {
                        _id: 0,
                        productName: "$_id.productName",
                        productCategory: "$_id.productCategory",
                        specification: "$_id.specification",
                        productIds: 1,
                        count: 1 // Optional: include the count
                    }
                }
            ]
            const products = await productModel.aggregate(pipeline);
            return res.success(200, "All unique products found successfully.", products);
        } catch (error) {
            console.log("Error fetching unique products: " + error);
            return res.error(400, error, null);
        }
    }
}

export default productController;
