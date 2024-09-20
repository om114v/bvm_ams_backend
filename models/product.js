import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ["AllInOne", "CPU", "Keyboard", "Mouse", "Monitor"],
        },
        model: { type: String, required: true },
        purchaseDate: { type: Date, required: true },
        specification: { type: String },
        location: { type: String, required: true },
    },
    {
        timestamps: true,
        discriminatorKey: "type",
    }
);

const allInOneSchema = new mongoose.Schema(
    {
        processor: { type: String, required: true },
        generations: { type: Number, required: true },
        cores: { type: Number, required: true },
        l3Cache: { type: Number, required: true },
        threads: { type: Number, required: true },
        baseClockSpeed: { type: Number, required: true },
        turboClockSpeed: { type: Number, required: true },
        power: { type: Number, required: true },
        ram: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalRam: { type: Number, required: true },
        hdd: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalHdd: { type: Number, required: true },
        ssd: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalSsd: { type: Number, required: true },
        graphicsCard: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        screnType: { type: String, required: true },
    }
);

const cpuSchema = new mongoose.Schema(
    {
        processor: { type: String, required: true },
        generations: { type: Number, required: true },
        cores: { type: Number, required: true },
        l3Cache: { type: Number, required: true },
        threads: { type: Number, required: true },
        baseClockSpeed: { type: Number, required: true },
        turboClockSpeed: { type: Number, required: true },
        power: { type: Number, required: true },
        ram: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalRam: { type: Number, required: true },
        hdd: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalHdd: { type: Number, required: true },
        ssd: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
        totalSsd: { type: Number, required: true },
        motherBoard: { type: String, required: true },
        graphicsCard: [{
            size: { type: Number, required: true },
            type: { type: String, required: true }
        }],
    }
);

const monitorSchema = new mongoose.Schema(
    {
        screenType: { type: String, required: true },
    }
);

const mouseSchema = new mongoose.Schema(
    {
        mouseType: { type: String, required: true },
    }
);

const keyboardSchema = new mongoose.Schema(
    {
        keyboardType: { type: String, required: true },
    }
);

const productModel = mongoose.model('Product', productSchema);

const allInOneModel = productModel.discriminator(
    "AllInOne",
    allInOneSchema
);

const cpuModel = productModel.discriminator(
    "CPU",
    cpuSchema
);

const monitorModel = productModel.discriminator(
    "Monitor",
    monitorSchema
);

const mouseModel = productModel.discriminator(
    "Mouse",
    mouseSchema
);

const keyboardModel = productModel.discriminator(
    "Keyboard",
    keyboardSchema
);

export default {
    productModel,
    allInOneModel,
    cpuModel,
    monitorModel,
    mouseModel,
    keyboardModel
}