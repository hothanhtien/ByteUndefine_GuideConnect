import cloudinary from "../service/cloudinaryConfig";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'byteUndefine_GuideConnect/videos', // Thư mục lưu trữ trên Cloudinary
    resource_type: 'video', // Định dạng file là video
    allowed_formats: ['mp4', 'avi', 'mkv'], // Các định dạng video được phép
    public_id: (req, file) => file.originalname // Đặt tên tệp video
  }
});

const uploadVideo = multer({ storage: videoStorage });

export { uploadVideo };
