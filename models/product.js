const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    cost: Number,
    available: Boolean,
});

const Product = mongoose.model("Product", productSchema);

module.export = Product;