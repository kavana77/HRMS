import { RequestHandler } from "express"
import User from "../models/User"

const stepWeights: Record<string, number> = {
    "attendance-settings": 10,
    "shift": 10,
    "leave": 10,
    "holiday": 10,
    "policy": 20
}

export const completeStep: RequestHandler = async (req, res) => {
    try {
        const adminId = (req as any).user?.id
        const { step } = req.body
        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!stepWeights[step]) {
            return res.status(400).json({ message: "Invalid step" })
        }
        await User.findByIdAndUpdate(adminId, {
            $addToSet: { completedSteps: step }
        })
        return res.status(200).json({ message: "Step completed" })
    } catch (error) {
        console.error("Error completing step", error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export const getProgress: RequestHandler = async (req, res) => {
    try {
        const adminId = (req as any).user?.id
        const user = await User.findById(adminId)
        const completedSteps = user?.completedSteps || []
        const progress = completedSteps.reduce((total: number, step: string) => {
            return total + (stepWeights[step] || 0)
        }, 0)
        return res.status(200).json({ completedSteps, progress })

    } catch (error) {
        console.error("Error fetching progress", error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}