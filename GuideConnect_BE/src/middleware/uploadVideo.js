import cloudinary from "../service/cloudinaryConfig";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'byteUndefine_GuideConnect/videos', // Thư mục lưu trữ trên Cloudinary
    resource_type: 'video', // Định dạng file là video
    allowedFormats: ['mp4', 'avi', 'mkv'], // Các định dạng video được phép
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }
});

const uploadVideo = multer({ storage: videoStorage });

module.exports = {uploadVideo};
