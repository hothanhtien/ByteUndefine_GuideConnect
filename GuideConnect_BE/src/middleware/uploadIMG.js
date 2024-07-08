import cloudinary from '../service/cloudinaryConfig';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
require('dotenv').config();

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'byteUndefine_GuideConnect'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = {uploadCloud};
