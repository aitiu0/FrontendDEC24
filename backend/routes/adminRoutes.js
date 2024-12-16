const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const wrapAsync = require("../errors/wrapAsync");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Guest Routes
router
  .route("/guest")
  .get(isLoggedIn, isAdmin, adminController.viewGuests)
  .post(isLoggedIn, isAdmin, adminController.createGuest);

router
  .route("/guests/:id")
  .get(isLoggedIn, isAdmin, adminController.viewGuest)
  .put(isLoggedIn, isAdmin, adminController.editGuest)
  .delete(isLoggedIn, isAdmin, adminController.deleteGuest);

  /* ------------------------------- Product Routes ------------------------------------ */
router
.route("/products")
.get(isLoggedIn, isAdmin, wrapAsync(adminController.viewProducts))
.post(
  isLoggedIn,
  isAdmin,
  upload.array("files", 1),
  wrapAsync(adminController.createProduct)
);
router
.route("/products/:id")
.get(isLoggedIn, isAdmin, wrapAsync(adminController.viewProduct))
.put(
  isLoggedIn,
  isAdmin,
  upload.array("files", 1),
  wrapAsync(adminController.editProduct)
)
.delete(isLoggedIn, isAdmin, adminController.deleteProduct);
/* ------------------------------- End Product Routes ------------------------------------ */

/* ------------------------------- Category Routes ------------------------------------ */
router
  .route("/categories")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewCategories))
  .post(isLoggedIn, isAdmin, wrapAsync(adminController.createCategory));
/* ------------------------------- End Category Routes ------------------------------------ */

/* ------------------------------- Brand Routes ------------------------------------ */
router
  .route("/brands")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewBrands))
  .post(isLoggedIn, isAdmin, wrapAsync(adminController.createBrand));
/* ------------------------------- End Brand Routes ------------------------------------ */

module.exports = router;
