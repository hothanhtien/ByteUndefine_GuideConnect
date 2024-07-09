import cloudinary from "../../service/cloudinaryConfig";
import dotenv from 'dotenv';
import uploadService from "./upload.service";
dotenv.config();

class uploadController {
    uploadImage = async (req, res, next) => {
      console.log('zô đây ko')
        try {
            const token = req.header('Authorization');

            if (!token) {
                console.log('No token found');
                return res.sendStatus(401); 
            }

            const image = req.file.path;
            const result = await cloudinary.uploader.upload(image);
            const resUpdate = await uploadService.updateUser(token, result);

            if (resUpdate.success) {
                return res.status(200).json({
                    message: "Upload image success",
                    data: resUpdate.data
                });
            } else {
                return res.status(resUpdate.status).json({
                    message: resUpdate.message
                });
            }
        } catch (error) {
            console.error('Upload error:', error);
            return res.status(400).json({
                name: error.name,
                message: error.message
            });
        }
    }
    uploadVideo = async (req, res, next) => {
        try {
          if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
          }
    
          const video = req.file.path;
          const result = await cloudinary.uploader.upload(video, {
            resource_type: "video", // Định dạng file là video
            folder: 'byteUndefine_GuideConnect/videos', // Thư mục lưu trữ trên Cloudinary
            allowed_formats: ['mp4', 'avi', 'mkv'], // Các định dạng video được phép
            eager: [{ width: 300, height: 300, crop: "pad", audio_codec: "none" }], // Các cài đặt tùy chọn
          });
    
          return res.status(200).json({
            message: "Upload video success",
            data: result
          });
        } catch (error) {
          console.error('Upload error:', error);
          return res.status(400).json({
            name: error.name,
            message: error.message
          });
        }
    };
}

export default new uploadController();
