import express from 'express';
import userHome from './userHome.controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';

const router = express.Router();

// lọc guide theo các tiêu chí thì sẽ truyền trên param nha

//GET | lc/apis/userHome
router.get('/', userHome.getAllGuide);
//GET | lc/apis/userHome/searchByName
router.get('/searchByName', userHome.getGuideByNameSearch)
//GET | lc/apis/userHome/searchByPlace
router.get('/searchByPlace', userHome.getGuideByPlaceSearch)
//GET | lc/apis/userHome/:id
router.get('/:id', userHome.getGuideDetail)


// Phân trang nha mấy ní fe muốn 1 trang mấy item thì limit nha

// http://localhost:3000/apis/userHome/searchByName?name=Gia&gender=nam&hometown=Quảng Bình&page=3&limit=20


export default router;
