import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware'
const { createReview, getReviewsByProductId, updateReview, deleteReview } = require('../controllers/review.controller')


const router = express.Router();

//create review router 
router.post('/create/:productId', requireSignIn, createReview)
router.get('/get/:productId', getReviewsByProductId)
router.put('/update/:reviewId', requireSignIn, updateReview)
router.delete('/delete/:reviewId', requireSignIn, deleteReview)


export default router