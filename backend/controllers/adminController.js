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

// GUEST
//GUEST CRUD
module.exports.createGuest = asyncHandler(async (req, res) => {
  // Find the current user
  const currentUser = await User.findById(req.user._id);
  // Fetch Guest data from the request body
  const data = req.body.guest;
  console.log(data);
  data.userType = "Guest";
  data.deleted = false;
  data.username = data.email;
  data.createdBy = currentUser;
  await User.create(data);
  res.status(201).json({ message: "Guest created" });
});
module.exports.deleteGuest = asyncHandler(async (req, res) => {
  const guest = await User.findById(req.params.id);
  guest.deleted = true;
  await guest.save();
  res.json({ message: "Guest deleted" });
});
module.exports.editGuest = asyncHandler(async (req, res) => {
  const data = req.body.guest;
  data.username = data.email;
  const password = req.body.password;
  const guest = await User.findByIdAndUpdate({ _id: req.params.id }, data);
  await guest.save();
  res.status(201).json(guest);
});
module.exports.viewGuests = asyncHandler(async (req, res) => {
  // Si se pasa el parámetro `all`, devolver todos los invitados
  if (req.query.all) {
    const guests = await User.find({ userType: "Guest" });
    return res.json({ guests });
  }

  // Paginación y ordenamiento
  const pageSize = Number(req.query.pageSize) || 10; // Tamaño de la página por defecto
  const page = Number(req.query.pageNumber) || 1; // Página actual
  const sortField = req.query.sort; // Campo por el cual ordenar
  const order = req.query.order === "ascending" ? 1 : -1; // Orden (1: ascendente, -1: descendente)

  // Validar el campo de ordenamiento
  const validSortFields = [
    "name",
    "lastName",
    "email",
    "phone",
    "username",
    "tradename",
  ];
  const sortCondition = validSortFields.includes(sortField)
    ? { [sortField]: order }
    : {};

  // Filtrado por palabra clave (name, lastName, email, tradename)
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { lastName: { $regex: req.query.keyword, $options: "i" } },
          { email: { $regex: req.query.keyword, $options: "i" } },
          { tradename: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Contar el total de documentos para paginación
  const count = await User.countDocuments({
    deleted: false,
    userType: "Guest",
    ...keyword,
  });

  // Obtener los invitados con paginación y ordenamiento
  const guests = await User.find({
    deleted: false,
    userType: "Guest",
    ...keyword,
  })
    .sort(sortCondition)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Enviar respuesta
  res.json({
    guests,
    page,
    pages: Math.ceil(count / pageSize),
    totalGuests: count,
  });
});

module.exports.viewGuest = asyncHandler(async (req, res) => {
  const guest = await User.findById(req.params.id);
  if (guest) {
    res.json(guest);
  } else {
    res.status(404);
    throw new Error("Guest not found");
  }
});

/* ---------------------------- CATEGORY CRUD ----------------------------- */
// --------------- Create Category ---------------
module.exports.createCategory = asyncHandler(async (req, res) => {
  const data = req.body.category;
  const currentUser = await User.findById(req.user._id);
  data.user = currentUser;
  const category = new Category(data);
  await category.save();
  res.status(201).json({ message: "Category created" });
});
// --------------- View Categories ---------------
module.exports.viewCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json({ categories });
});
/* -------------------------- END CATEGORY CRUD --------------------------- */

/* ---------------------------- BRAND CRUD ----------------------------- */
// --------------- Create Brand ---------------
module.exports.createBrand = asyncHandler(async (req, res) => {
  const data = req.body;
  const currentUser = await User.findById(req.user._id);
  data.user = currentUser;
  const brand = new Brand(data);
  await brand.save();
  res.status(201).json({ message: "Brand created" });
});
// --------------- View Brands ---------------
module.exports.viewBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});
  res.json({ brands });
});
/* -------------------------- END BRAND CRUD --------------------------- */

/* -------------------------- PRODUCT CRUD ---------------------------- */
// --------------- Create Product ---------------
module.exports.createProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);

  //  product
  const newProduct = new Product(data);
  const currentUser = await User.findById(req.user._id);
  newProduct.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Test/products/",
        });
        var uploadImage = {
          url: imageProduct.secure_url,
          filename: imageProduct.public_id,
        };
        newProduct.images.push(uploadImage);
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await newProduct.save();
  res.status(201).json({ message: "Product created" });
});
// --------------- Delete Product ---------------
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.deleted = true;
  await product.save();
  res.status(201).json("Product deleted");
});
// --------------- Edit Product ---------------
module.exports.editProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);
  // --------------- Update product ---------------
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, data);
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Test/products/",
        });
        var uploadImage = {
          url: imageProduct.secure_url,
          filename: imageProduct.public_id,
        };
        product.images = [];
        product.images.push(uploadImage);
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await product.save();
  res.status(204).json({ message: "Product updated" });
});
// --------------- View Products ---------------
module.exports.viewProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10; // Tamaño de página por defecto
  const page = Number(req.query.pageNumber) || 1; // Página actual
  const sort = req.query.sort; // Campo para ordenar
  const order = req.query.order === "ascending" ? 1 : -1; // Orden: ascendente o descendente

  // Condición de ordenamiento
  const sortCondition = sort ? { [sort]: order } : {};

  // Filtro por palabra clave
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Contar total de productos para paginación
  const count = await Product.countDocuments({
    deleted: false,
    ...keyword,
  });

  // Obtener los productos
  const products = await Product.find({
    deleted: false,
    ...keyword,
  })
    .sort(sortCondition)
    .populate("category") // Poblamos la categoría
    .populate("brand") // Poblamos la marca
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Respuesta al cliente
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});
// --------------- View Product ---------------
module.exports.viewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
/* -------------------------- END PRODUCT CRUD ---------------------------- */
