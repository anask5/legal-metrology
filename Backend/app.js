import express, { urlencoded } from "express";
import mongoose from "mongoose";
import db from '../Backend/config/db.js';
import userModel from "../Backend/models/userModel.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cors from 'cors';
import auth from '../Backend/middleware/auth.js'

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




app.post('/test', (req, res) => {
    res.end("Legal Metrology API is Running !")
})
app.post('/api/register', async (req, res) => {
    try {
    const newUser = req.body
    // PASSWORD HASHING 

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newUser.password, salt);
    let createdUser = await userModel.create({
            roll_no: newUser.roll_no,
            name: newUser.name,
            password: secPass,
            email: newUser.email
          })
           let token =  jwt.sign({email: newUser.email,
            role: createdUser.role
           }, "topsecret",
                
             );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
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
            secure: true,
            sameSite: "none",
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
            secure: true,
            sameSite: "none",
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

    app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
})
};