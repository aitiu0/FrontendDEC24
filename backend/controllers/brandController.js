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

// ger Brands
module.exports.viewBrands = asyncHandler(async (req, res) => {
    // Si se pasa el parámetro `all`, devolver todas las marcas
    if (req.query.all) {
        const brands = await Brand.find();
        return res.json({ brands });
    }
    
}
);