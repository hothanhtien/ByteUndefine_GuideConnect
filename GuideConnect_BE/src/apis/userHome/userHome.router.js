import express from 'express';
import userHome from './userHome.controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';

const router = express.Router();

// lọc guide theo các tiêu chí thì sẽ truyền trên param nha

//GET | lc/apis/userHome
router.get('/', userHome.getAllGuide);
//GET | lc/apis/userHome/searchByPlace
router.get('/search', userHome.getGuideByPlaceSearch)
//GET | lc/apis/userHome/:id
router.get('/:id', userHome.getGuideDetail)

router.post('/test', userHome.test)


// Phân trang nha mấy ní fe muốn 1 trang mấy item thì limit nha

// http://localhost:3000/apis/userHome/search?name=Gia&gender=nam&hometown=Quảng Bình&page=&limit=5


export default router;
