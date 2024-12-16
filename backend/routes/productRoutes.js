const express = require("express");
const router = express.Router();


const brandController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productsController");
const wrapAsync = require("../errors/wrapAsync");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(wrapAsync(productController.viewProducts));


module.exports = router;