const express = require("express");
const router = express.Router();


const brandController = require("../controllers/brandController");
const wrapAsync = require("../errors/wrapAsync");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(wrapAsync(brandController.viewBrands));


module.exports = router;