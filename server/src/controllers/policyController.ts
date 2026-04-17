import { RequestHandler } from "express";
import mongoose from "mongoose";
import Policy from "../models/Policy";
import { cloudinaryUpload } from "../service/fileService";

// CREATE POLICY
export const createPolicy: RequestHandler = async (req, res) => {
  try {
    const { policyName, category, effectiveFrom } = req.body;
    let documentUrl = "";
    let publicId = "";

    if (req.file) {
      const uploadResult = await cloudinaryUpload(req.file);
      documentUrl = uploadResult.url;
      publicId = uploadResult.public_id;
    } 

    const isComplete = policyName && category && effectiveFrom && documentUrl
    const status = isComplete ? "Active" : "Draft"  

    const policy = await Policy.create({
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
  } catch (error) {
    console.error("Failed to create policy", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL POLICIES
export const getPolicies: RequestHandler = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Policies fetched successfully",
      data: policies,
    });
  } catch (error) {
    console.error("Failed to get policies", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET POLICY BY ID
export const getPolicyById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Policy ID" });
    }

    const policy = await Policy.findById(id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    return res.status(200).json({
      message: "Policy fetched successfully",
      data: policy,
    });
  } catch (error) {
    console.error("Failed to get policy by id", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE POLICY
export const updatePolicy: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { policyName, category, effectiveFrom } = req.body;
    if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Policy ID" });
    }

    const existingPolicy = await Policy.findById(id);

    if (!existingPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    let documentUrl = existingPolicy.documentUrl;
    let publicId = existingPolicy.publicId;

    
    if (req.file) {
      const uploadResult = await cloudinaryUpload(req.file);
      documentUrl = uploadResult.url;
      publicId = uploadResult.public_id;
    }
    const isComplete = policyName && category && effectiveFrom && documentUrl
    const status = isComplete ? "Active" : "Draft"
    const updatedPolicy = await Policy.findByIdAndUpdate(
      id,
      {
        policyName,
        category,
        effectiveFrom,
        documentUrl,
        publicId,
        status
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Policy updated successfully",
      data: updatedPolicy,
    });
  } catch (error) {
    console.error("Failed to update policy", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE POLICY 
export const deletePolicy: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Policy ID" });
    }

    const deletedPolicy = await Policy.findByIdAndDelete(id);

    if (!deletedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    return res.status(200).json({
      message: `${deletedPolicy.policyName} Policy deleted successfully`,
    });
  } catch (error) {
    console.error("Failed to delete policy", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};