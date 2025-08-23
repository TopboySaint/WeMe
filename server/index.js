const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
app.use(cors());
app.use(express.json());
const uri = process.env.URI;
const port = process.env.PORT || 5010;
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const connection = mongoose
  .connect(uri)
  .then((response) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongoose");
  });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("WeMe", userSchema);

app.get("/", (req, res) => {
  res.status(201).json({ message: "Let us connect" });
});

app.post("/signup", async(req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try{

      const hashedPassword = await bcrypt.hash(password, saltRounds)

      const user = new userModel({ firstName, lastName, email, password: hashedPassword})
      await user.save()

      console.log("user saved successfully");
      res.status(201).json({ message: "user saved successfully" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: "Welcome",
        html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; margin: 0; padding: 0; color: #333;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); padding: 30px;">
      <h2 style="color: #2d72d9;">Welcome to Onlyfanspro !</h2>
      <p>Hi</p>
      <p>Thank you for signing up for <strong>WeMe</strong>! 🎉</p>
      <p>Your account has been created successfully, and you're now part of our community.</p>
      <p>You can now start exploring everything we have to offer.</p>
      <p>If you ever have questions or need support, feel free to reply to this email — we're here to help!</p>
      <p>Best regards,</p>
      <p><strong>The WeMe Team</strong></p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; margin-top: 40px;">
      &copy; 2025 WeMe. All rights reserved.
    </div>
  </body>
</html>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(`Error sending mail: ${error.message}`);
        }
        res.status(201).send(`Email send successfully: ${info}`);
      });
    
      console.log("error saving user", err);
      res.status(501).json({ message: "user not saved" });

    } catch(err){
      console.log(err);
    }  
});


app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(401).send("No user found");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: `Welcome ${foundUser.email}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// app.post('/decodetoken', (req,res)=>{
//     const token = req.body.token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
//         if(err){
//             return res.status(401).json({message: `Invalid token`})
//         }
//         res.status(201).json(`${decode}`)
//     })
// })


app.get("/dashboard", async (req, res) => {
  try {
    const users = await userModel.find({}, "firstName lastName email");
    res.status(201).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

app.listen(port, () => {
  console.log("May look like overnight success");
});
