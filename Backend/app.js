    import express, { urlencoded } from "express";
    import mongoose from "mongoose";
    import db from '../Backend/config/db.js';
    import userModel from "../Backend/models/userModel.js";
    import ComplianceModel from "../Backend/models/complianceReport.js";
    import cookieParser from "cookie-parser";
    import jwt from "jsonwebtoken";
    import bcrypt from 'bcrypt';
    import cors from 'cors';
    import isAdmin from '../Backend/middleware/isAdmin.js'
    import auth from '../Backend/middleware/auth.js'
    import upload from "../Backend/middleware/upload.js";
    import analyzeProduct from "../Backend/services/aiService.js";
    import checkCompliance from "../Backend/rules/legalMetrologyRules.js";
    import Inspection from "../Backend/models/totalReport.js";


    const app = express();
    const port = process.env.PORT || 3000;


    app.use(cookieParser());    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
    );


    startServer();



    async function startServer (){
        await db();


        app.get('/', (req, res) => {
        res.send("Legal Metrology API Running")

    })




    app.post('/api/register', async (req, res) => {
        try {
        const newUser = req.body
        // PASSWORD HASHING 

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(newUser.password, salt);
        let createdUser = await userModel.create({
                emp_id: newUser.emp_id,
                name: newUser.name,
                password: secPass,
                email: newUser.email,
                dept: newUser.dept
            })
            let token =  jwt.sign({
                id: createdUser._id, 
                email: newUser.email,
                role: createdUser.role
            }, "topsecret",
                    
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
    })



    app.post('/api/login', async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const foundUser = await userModel.findOne({ email: email });
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
                let token =  jwt.sign({email: foundUser.email,
                    role: foundUser.role
                            }, "topsecret",
                    
                );
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
                res.status(200).json({
                success: true,
                message: "Login Successfully"
    });        } 
            else {
                res.status(401).json({
                    message: "Invalid password"
                });
            }

        } catch (err) {
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
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    });

//     app.post('/api/scan', upload.single('image'), async (req, res) => {

//         try {
//             console.log("received")
//             if (!req.file) {
//                 return res.status(400).json({
//                     success:false,
//                     message: "Product image is required"
//                 });
//             }


//             const AiResult = await analyzeProduct(req.file.path);

//             console.log('AI Result', AiResult);

//             const ruleResult = await checkCompliance(AiResult);
            
//             let complianceResult = await ComplianceModel.create({
//                 image: req.file.path,
//                 extractedData: AiResult,
//                 confidenceScore: ruleResult.confidenceScore,
//                 complianceResult: ruleResult.overallStatus,
//                 violations: ruleResult.violations,
//                 inspector: req.user
//             })
//             console.log("Compliance Report Added");
            
//             const stats = await Inspection.findOne();
//             if (!stats) {
//         stats = await Inspection.create({
//             productScanned: 0,
//             compliant: 0,
//             potentialViolation: 0,
//             pendingReview: 0
//   });
// }
    
//             stats.productScanned += 1;

//         if (ruleResult.overallStatus === "COMPLIANT") {
//             stats.compliant += 1;
//     }

//         if (ruleResult.overallStatus === "POTENTIAL_VIOLATIONS") {
//         stats.potentialViolation += 1;
//     }

//         if (ruleResult.overallStatus === "PENDING") {
//             stats.pendingReview += 1;   
//     }

//     await stats.save();
//             return res.status(200).json({
//                 success: true,
//                 message: "Product Scanned Successfully",
//                 data: {
//                     inspectionID: complianceResult._id,
//                     extractedData: AiResult,
//                     Compliance: ruleResult
//                 }
//             });

//         }
//         catch(err){

//             console.error(err);

//             return res.status(500).json({
//                 success: false,
//                 message: 'scan failed'
//             });

//         }
        
//     });
app.post('/api/scan', auth, upload.single('image'), async (req, res) => {
    try {
        console.log("received");

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required"
            });
        }

        const AiResult = await analyzeProduct(req.file.path);
        console.log('AI Result', AiResult);

        const ruleResult = await checkCompliance(AiResult);

        const complianceResult = await ComplianceModel.create({
            image: req.file.path,
            extractedData: AiResult,
            confidenceScore: ruleResult.confidenceScore,
            complianceResult: ruleResult.overallStatus,
            violations: ruleResult.violations,
            inspector: req.user.id || req.user._id
        });
        console.log("Compliance Report Added");

        // Determine which category to increment
        const incUpdates = { productScanned: 1 };

        if (ruleResult.overallStatus === "COMPLIANT") {
            incUpdates.compliant = 1;
        } else if (ruleResult.overallStatus === "POTENTIAL_VIOLATIONS") {
            incUpdates.potentialViolation = 1;
        } else if (ruleResult.overallStatus === "PENDING") {
            incUpdates.pendingReview = 1;
        }

        // Upsert creates the doc if empty, and atomically increments counters
        await Inspection.findOneAndUpdate(
            {},
            { $inc: incUpdates },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Product Scanned Successfully",
            data: {
                inspectionID: complianceResult._id,
                extractedData: AiResult,
                Compliance: ruleResult
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'scan failed'
        });
    }
});

    app.get('/api/inspections', async (req, res) => {

        try {

            const inspections = await ComplianceModel
                .find()
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: inspections.length,
                data: inspections
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch inspections"
            });

        }

    });

    app.get('/api/inspection/:id', async (req, res) => {
        try {

            const inspection = await ComplianceModel    .findById(req.params.id);

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

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch inspection"
            });

        }
    });

    app.post('/api/violation/:id/confirm', async (req, res) => {

        try {

            const inspection = await Compliance.findById(req.params.id);

            if (!inspection) {
                return res.status(404).json({
                    success: false,
                    message: "Inspection not found"
                });
            }

            const violationIndex = req.body.violationIndex;

            if (
                violationIndex === undefined ||
                !inspection.violations[violationIndex]
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid violation"
                });
            }

            inspection.violations[violationIndex].status = "CONFIRMED";

            await inspection.save();

            return res.status(200).json({
                success: true,
                message: "Violation confirmed",
                data: inspection
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to confirm violation"
            });

        }

    });

    app.post('/api/violation/:id/decline', async (req, res) => {

        try {

            const inspection = await Compliance.findById(req.params.id);

            if (!inspection) {
                return res.status(404).json({
                    success: false,
                    message: "Inspection not found"
                });
            }

            const violationIndex = req.body.violationIndex;

            if (
                violationIndex === undefined ||
                !inspection.violations[violationIndex]
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid violation"
                });
            }

            inspection.violations[violationIndex].status = "DECLINED";

            await inspection.save();

            return res.status(200).json({
                success: true,
                message: "Violation declined",
                data: inspection
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to decline violation"
            });

        }

    });

        app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    })
    };