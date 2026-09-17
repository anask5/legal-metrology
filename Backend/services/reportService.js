import ComplianceModel from "../models/complianceReport.js";

const generateInspectionReport = async (inspectionId) => {
    const inspection = await ComplianceModel
        .findById(inspectionId)
        .populate("inspector", "name emp_id email dept");
    if (!inspection) {
        return null;
    }
    return {
        inspectionId: inspection._id,
        productInformation: inspection.extractedData,
        extractedDeclarations: inspection.extractedData,
        complianceResult: inspection.complianceResult,
        complianceChecks: inspection.extractedData,
        violations: inspection.violations,
        evidence: inspection.image,
        dateTime: inspection.createdAt,
        inspector: inspection.inspector
    };
};
export default generateInspectionReport;