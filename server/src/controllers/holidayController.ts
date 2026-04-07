import { RequestHandler } from "express";
import Holiday from "../models/Holiday";

export const addHoliday: RequestHandler = async (req, res) => {
    try {
        const { holidayName, holidayDate} = req.body
        // const userId = req.user?.id
        if (!holidayName || !holidayDate){
            return res.status(400).json({message: "All fields are required"})
        }
        if (isNaN(Date.parse(holidayDate))){
            return res.status(400).json({message: "Invalid date format"})
        }
        const newHoliday = new Holiday({
            holidayName,
            holidayDate
        })
        await newHoliday.save()
        return res.status(201).json({message: "Holiday added successfully", data: newHoliday})
    } catch (error) {
        console.error("Failed to add holiday", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getHolidays: RequestHandler = async (req, res) =>{
    try {
        const Holidays = await Holiday.find().sort({holidayDate: 1})
        return res.status(200).json({message: "Holidays fetched successfully", data: Holidays})
    } catch (error) {
        console.error("Failed to get holidays", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateHoliday: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params
        const {holidayName, holidayDate} = req.body
        const holiday = await Holiday.findById(id)
        if(!holiday){
            return res.status(404).json({message: "Holiday not found"})
        }
        const updatedHoliday = await Holiday.findByIdAndUpdate(id, {holidayName, holidayDate}, {new: true})
        return res.status(200).json({message: "Holiday updated successfully", data: updatedHoliday})
    } catch (error) {
        console.error("Failed to update holiday", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteHoliday: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params
        const holiday = await Holiday.findById(id)
        if(!holiday){
            return res.status(404).json({message: "Holiday not found"})
        }
        await Holiday.deleteOne({_id: id})
        return res.status(200).json({message: "Holiday deleted successfully"})
    } catch (error) {
        console.error("Failed to delete holiday", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}