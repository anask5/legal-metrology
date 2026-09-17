import ComplianceModel from "../models/complianceReport.js";
import Inspection from "../models/totalReport.js";

const saveInspection = async ({
    image,
    extractedData,
    ruleResult,
    inspector
}) => {

    const complianceResult = await ComplianceModel.create({
        image,
        extractedData,
        confidenceScore: ruleResult.confidenceScore,
        complianceResult: ruleResult.overallStatus,
        violations: ruleResult.violations,
        inspector
    });

    const incUpdates = {
        productScanned: 1
    };

    if (ruleResult.overallStatus === "COMPLIANT") {
        incUpdates.compliant = 1;
    }
    else if (ruleResult.overallStatus === "POTENTIAL_VIOLATIONS") {
        incUpdates.potentialViolation = 1;
    }
    else if (ruleResult.overallStatus === "PENDING") {
        incUpdates.pendingReview = 1;
    }

    await Inspection.findOneAndUpdate(
        {},
        { $inc: incUpdates },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );

    return complianceResult;
};


const getAllInspections = async () => {
    return await ComplianceModel
        .find()
        .sort({ createdAt: -1 });
};


const getInspectionById = async (id) => {
    return await ComplianceModel.findById(id);
};


const updateViolationStatus = async (
    inspectionId,
    violationIndex,
    status
) => {

    const inspection = await ComplianceModel.findById(inspectionId);

    if (!inspection) {
        return null;
    }

    if (
        violationIndex === undefined ||
        !inspection.violations[violationIndex]
    ) {
        throw new Error("Invalid violation");
    }

    inspection.violations[violationIndex].status = status;

    await inspection.save();

    return inspection;
};


export {
    saveInspection,
    getAllInspections,
    getInspectionById,
    updateViolationStatus
};