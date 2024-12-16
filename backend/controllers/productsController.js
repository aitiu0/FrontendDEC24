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


// get Products

module.exports.viewProducts = asyncHandler(async (req, res) => {
    // Si se pasa el parámetro `all`, devolver todos los productos
    if (req.query.all) {
        const products = await Product.find();
        return res.json({ products });
    }
    
    // Paginación y ordenamiento
    const pageSize = Number(req.query.pageSize) || 10; // Tamaño de la página por defecto
    const page = Number(req.query.pageNumber) || 1; // Página actual
    const sortField = req.query.sort; // Campo por el cual ordenar
    const order = req.query.order === "ascending" ? 1 : -1; // Orden (1: ascendente, -1: descendente)
    
    // Validar el campo de ordenamiento
    const validSortFields = ["name", "price", "stock", "category", "brand"];
    const sortCondition = validSortFields.includes(sortField) ? { [sortField]: order } : {};
    
    // Filtrado por palabra clave (name, lastName, email, tradename)
    const keyword = req.query.keyword
        ? {
            $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { price: { $regex: req.query.keyword, $options: "i" } },
            { stock: { $regex: req.query.keyword, $options: "i" } },
            { category: { $regex: req.query.keyword, $options: "i" } },
            { brand: { $regex: req.query.keyword, $options: "i" } },
            ],
        }
        : {};
    
    // Filtrado por categoría
    const category = req.query.category ? { category: req.query.category } : {};
    
    // Filtrado por marca
    const brand = req.query.brand ? { brand: req.query.brand } : {};
    
    // Filtrado por precio mínimo
    const minPrice = req.query.minPrice ? { price: { $gte: req.query.minPrice } } : {};
    
    // Filtrado por precio máximo
    const maxPrice = req.query.maxPrice ? { price: { $lte: req.query.maxPrice } } : {};
    
    // Filtrado por stock mínimo
    const minStock = req.query.minStock ? { stock: { $gte: req.query.minStock } } : {};
    
    // Filtrado por stock máximo
    const maxStock = req.query.maxStock ? { stock: { $lte: req.query.maxStock } } : {};

    // Filtrado por productos en oferta
    const onSale = req.query.onSale ? { onSale: req.query.onSale } : {};

    // Filtrado por productos eliminados
    const deleted = req.query.deleted ? { deleted: req.query.deleted } : {};

    // Contar el total de documentos para paginación
    const count = await Product.countDocuments({
        ...keyword,
        ...category,
        ...brand,
        ...minPrice,
        ...maxPrice,
        ...minStock,
        ...maxStock,
        ...onSale,
        ...deleted,
    });

    // Obtener los productos con paginación y ordenamiento
    const products = await Product.find({
        ...keyword,
        ...category,
        ...brand,
        ...minPrice,
        ...maxPrice,
        ...minStock,
        ...maxStock,
        ...onSale,
        ...deleted,
    })
        .sort(sortCondition)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    // Enviar respuesta
    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        totalProducts: count,
    });
}
);



 