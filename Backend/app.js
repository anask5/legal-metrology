import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import db from "../Backend/config/db.js";
import userModel from "../Backend/models/userModel.js";
import ComplianceModel from "../Backend/models/complianceReport.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import isAdmin from "../Backend/middleware/isAdmin.js";
import auth from "../Backend/middleware/auth.js";
import upload from "../Backend/middleware/upload.js";
import analyzeProduct from "../Backend/services/aiService.js";
import checkCompliance from "../Backend/rules/legalMetrologyRules.js";
import Inspection from "../Backend/models/totalReport.js";

import {
    saveInspection,
    getAllInspections,
    getInspectionById,
    updateViolationStatus
} from "../Backend/services/inspectionService.js";

import generateInspectionReport from "../Backend/services/reportService.js";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
startServer();

async function startServer() {
    await db();
    app.get("/", (req, res) => {
        res.send("Legal Metrology API Running");
    });

    app.post("/api/register", isAdmin, async (req, res) => {
        try {
            const newUser = req.body;
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(
                newUser.password,
                salt
            );

            const createdUser = await userModel.create({
                emp_id: newUser.emp_id,
                name: newUser.name,
                password: secPass,
                email: newUser.email,
                dept: newUser.dept
            });


            const token = jwt.sign(
                {
                    id: createdUser._id,
                    email: newUser.email,
                    role: createdUser.role
                },
                process.env.JWT_SECRET
            );


            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json({
                message: "Registered Successfully"
            });
        }

        catch (err) {
            console.error(err);
            res.status(500).send("Server Error");

        }
    });

    app.post("/api/login", async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const foundUser = await userModel.findOne({
                email: email
            });
            if (!foundUser) {

                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isMatch = await bcrypt.compare(
                password,
                foundUser.password
            );
            if (isMatch) {
                const token = jwt.sign(
                    {
                        id: foundUser._id,
                        email: foundUser.email,
                        role: foundUser.role
                    },
                    process.env.JWT_SECRET
                );
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({
                    success: true,
                    message: "Login Successfully"
                });
            }
            else {
                res.status(401).json({
                    message: "Invalid password"

                });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }

    });

    app.get("/api/me", auth, (req, res) => {

        res.json(req.user);

    });
    app.post("/api/logout", auth, async (req, res) => {

        try {

            res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                success: true,
                message: "Logout Successfully"
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    });

    app.post(
        "/api/scan",
        auth,
        upload.single("image"),
        async (req, res) => {

            try {

                console.log("received");

                if (!req.file) {
                    return res.status(400).json({
                        success: false,
                        message: "Product image is required"
                    });
                }
                if (!req.file.mimetype.startsWith("image/")) {
                    return res.status(400).json({
                        success: false,
                        message: "Uploaded file must be an image"
                    });
                }

                const AiResult = await analyzeProduct(
                    req.file.path
                );
                console.log("AI Result:", AiResult);
                const ruleResult = await checkCompliance(
                    AiResult
                );
                console.log("Rule Result:", ruleResult);
                const complianceResult = await saveInspection({
                    image: req.file.path,
                    extractedData: AiResult,
                    ruleResult: ruleResult,
                    inspector: req.user.id
                });


                console.log("Compliance Report Added");
                return res.status(200).json({
                    success: true,
                    message: "Product Scanned Successfully",
                    data: {
                        inspectionID: complianceResult._id,
                        extractedData: AiResult,
                        Compliance: ruleResult
                    }
                });
            }

            catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Scan failed",
                    error: err.message
                });
            }
        }
    );

    app.get(
        "/api/inspections",
        async (req, res) => {
            try {
                const inspections =
                    await getAllInspections();
                return res.status(200).json({
                    success: true,
                    count: inspections.length,
                    data: inspections
                });
            }

            catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch inspections"
                });
            }
        }
    );


    app.get(
        "/api/inspections/:id",
        async (req, res) => {
            try {
                const inspection =
                    await getInspectionById(
                        req.params.id
                    );
                if (!inspection) {
                    return res.status(404).json({
                        success: false,
                        message: "Inspection not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: inspection
                });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch inspection"
                });
            }
        }
    );
    app.post(
        "/api/violation/:id/confirm",
        async (req, res) => {
            try {
                const inspection =
                    await updateViolationStatus(
                        req.params.id,
                        req.body.violationIndex,
                        "CONFIRMED"
                    );
                if (!inspection) {
                    return res.status(404).json({
                        success: false,
                        message: "Inspection not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Violation confirmed",
                    data: inspection
                });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
        }
    );

    app.post(
        "/api/violation/:id/decline",
        async (req, res) => {
            try {
                const inspection =
                    await updateViolationStatus(
                        req.params.id,
                        req.body.violationIndex,
                        "DECLINED"
                    );
                if (!inspection) {
                    return res.status(404).json({
                        success: false,
                        message: "Inspection not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Violation declined",
                    data: inspection
                });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
        }
    );


    app.get(
        "/api/dashboard",
        async (req, res) => {
            try {
                const stats =
                    await Inspection.findOne();
                const recentInspections =
                    await ComplianceModel
                        .find()
                        .sort({ createdAt: -1 })
                        .limit(5);
                return res.status(200).json({
                    success: true,
                    data: {
                        totalInspections:
                            stats?.productScanned || 0,
                        compliantProducts:
                            stats?.compliant || 0,
                        potentialViolations:
                            stats?.potentialViolation || 0,
                        recentInspections:
                            recentInspections
                    }
                });
            }
            catch (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch dashboard data"
                });
            }
        }
    );

    app.post("/api/report/:inspectionId", async (req, res) => {
    try {
        const report = await generateInspectionReport(
            req.params.inspectionId
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Inspection report generated successfully",
            data: report
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to generate inspection report"
        });
    }
});

    app.listen(port, () => {
        console.log(
            `🚀 Server running on port ${port}`
        );
    });
}