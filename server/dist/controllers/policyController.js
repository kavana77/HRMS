"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePolicy = exports.updatePolicy = exports.getPolicyById = exports.getPolicies = exports.createPolicy = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Policy_1 = __importDefault(require("../models/Policy"));
const fileService_1 = require("../service/fileService");
// CREATE POLICY
const createPolicy = async (req, res) => {
    try {
        const { policyName, category, effectiveFrom } = req.body;
        let documentUrl = "";
        let publicId = "";
        if (req.file) {
            const uploadResult = await (0, fileService_1.cloudinaryUpload)(req.file);
            documentUrl = uploadResult.url;
            publicId = uploadResult.public_id;
        }
        const isComplete = policyName && category && effectiveFrom && documentUrl;
        const status = isComplete ? "Active" : "Draft";
        const policy = await Policy_1.default.create({
            policyName,
            category,
            effectiveFrom,
            documentUrl,
            publicId,
            status
        });
        return res.status(201).json({
            message: "1 Policy added to the organization successfully",
            data: policy,
        });
    }
    catch (error) {
        console.error("Failed to create policy", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createPolicy = createPolicy;
// GET ALL POLICIES
const getPolicies = async (req, res) => {
    try {
        const policies = await Policy_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Policies fetched successfully",
            data: policies,
        });
    }
    catch (error) {
        console.error("Failed to get policies", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getPolicies = getPolicies;
// GET POLICY BY ID
const getPolicyById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Policy ID" });
        }
        const policy = await Policy_1.default.findById(id);
        if (!policy) {
            return res.status(404).json({ message: "Policy not found" });
        }
        return res.status(200).json({
            message: "Policy fetched successfully",
            data: policy,
        });
    }
    catch (error) {
        console.error("Failed to get policy by id", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getPolicyById = getPolicyById;
// UPDATE POLICY
const updatePolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const { policyName, category, effectiveFrom } = req.body;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Policy ID" });
        }
        const existingPolicy = await Policy_1.default.findById(id);
        if (!existingPolicy) {
            return res.status(404).json({ message: "Policy not found" });
        }
        let documentUrl = existingPolicy.documentUrl;
        let publicId = existingPolicy.publicId;
        if (req.file) {
            const uploadResult = await (0, fileService_1.cloudinaryUpload)(req.file);
            documentUrl = uploadResult.url;
            publicId = uploadResult.public_id;
        }
        const isComplete = policyName && category && effectiveFrom && documentUrl;
        const status = isComplete ? "Active" : "Draft";
        const updatedPolicy = await Policy_1.default.findByIdAndUpdate(id, {
            policyName,
            category,
            effectiveFrom,
            documentUrl,
            publicId,
            status
        }, { new: true });
        return res.status(200).json({
            message: "Policy updated successfully",
            data: updatedPolicy,
        });
    }
    catch (error) {
        console.error("Failed to update policy", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updatePolicy = updatePolicy;
// DELETE POLICY 
const deletePolicy = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Policy ID" });
        }
        const deletedPolicy = await Policy_1.default.findByIdAndDelete(id);
        if (!deletedPolicy) {
            return res.status(404).json({ message: "Policy not found" });
        }
        return res.status(200).json({
            message: `${deletedPolicy.policyName} Policy deleted successfully`,
        });
    }
    catch (error) {
        console.error("Failed to delete policy", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deletePolicy = deletePolicy;
