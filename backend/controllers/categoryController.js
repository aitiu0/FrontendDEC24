const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Product = require("../models/productModel");

const { cloudinary } = require("../cloudinary");
const { unlink } = require("node:fs/promises");
const Excel = require("exceljs");
const { PassThrough } = require("stream");


// get Categories
module.exports.viewCategories = asyncHandler(async (req, res) => {
    // Si se pasa el parámetro `all`, devolver todas las categorías
    if (req.query.all) {
        const categories = await Category.find();
        return res.json({ categories });
    }
    
}
);