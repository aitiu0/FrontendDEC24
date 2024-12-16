const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

if (process.env.NODE_ENV === "production") {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_DEV,
    api_key: process.env.CLOUDINARY_API_KEY_DEV,
    api_secret: process.env.CLOUDINARY_SECRET_DEV,
    secure: true,
  });
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Examenes",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
