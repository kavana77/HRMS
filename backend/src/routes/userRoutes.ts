import express from 'express'
import verifyToken from '../middleware/authMiddlewate'

const router = express.Router()

//Only admin can access this router
router.get('/admin',verifyToken, (req ,res)=>{
    res.json({message: "Welcome Admin"})
})

//Both admin and manager can access this router
router.get('/manager',verifyToken, (req ,res)=>{
    res.json({message: "Welcome Manager"})
})

//All can access this router
router.get('/employee',verifyToken, (req ,res)=>{
    res.json({message: "Welcome Employee"})
})

export default router