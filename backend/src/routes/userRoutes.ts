import express from 'express'
import authorizeRoles from '../middleware/roleMiddleware'
import verifyToken from '../middleware/authMiddleware'

const router = express.Router()

//Only admin can access this router
router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" })
})

//Both admin and manager can access this router
router.get('/manager', verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" })
})

//All can access this router
router.get('/employee', verifyToken, authorizeRoles("admin", "manager","employee"), (req, res) => {
    res.json({ message: "Welcome Employee" })
})

export default router