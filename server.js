const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Product = require("./models/product.js");

app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/products", async (req, res) => {
    const allProducts = await Product.find();
    res.render("products/index.ejs", { products: allProducts });
});

app.get("/products/new", (req, res) => {
    res.render("products/new.ejs");
});

app.get("/products/:productId", async (req, res) => {
    const foundProduct = await Product.findById(req.params.productId);
    res.render("products/show.ejs", { product: foundProduct});
});

app.post("/products", async (req,res) => {
    if (req.body.available === "on") {
        req.body.available = true;
    } else {
        req.body.available = false;
    }
    await Product.create(req.body);
    res.redirect("/products");
});





















app.listen(3000, () => {
    console.log('Listening on port 3000');
});