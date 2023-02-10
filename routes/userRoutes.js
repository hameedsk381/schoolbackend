import express from "express";
import { deleteUser, getProfilePic, getUser, getUsers, loginUser,  updateUser } from "../controllers/userControllers.js";
import User from "../models/userModel.js";
import fs from 'fs'
import multer from "multer";

import path from "path";
import { randomUUID } from "crypto";
const Storages = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null,randomUUID() + file.originalname + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({ storage:Storages,fileFilter:fileFilter });
const userRoute = express.Router();

userRoute.post("/register",upload.single('image'),async (req, res) => {
  const { name, email, password, regId, department } = req.body;
  
  const newUser = new User({ name, email, password, regId, department, image:{
    data:fs.readFileSync('images/'+ req.file.filename),
    contentType:req.file.mimetype
  } });

  try {
    const savedUser = await newUser.save();
    res.send("User created successfully");
    console.log(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
} );
userRoute.post("/login",loginUser);
userRoute.get("/getusers",getUsers);
userRoute.put("/update",updateUser);
userRoute.get('/getuser/:id',getUser)
userRoute.delete('/deleteuser/:id',deleteUser)
userRoute.post('/uploadprofilepic',upload.single('profile'),(req, res) => {
  const { _id } = req.body
   
 

    try {
      const user = User.findByIdAndUpdate(
        _id,{image:{
          data:fs.readFileSync('images/'+ req.file.filename),
          contentType:req.file.mimetype
        }},
        ()=>{console.log("id found and profile picture updated");
      
      }
        
      );

      res.status(200).send({ message: "profile picture updated" });
      
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
})
userRoute.post('/getprofilepic',getProfilePic)
export default userRoute;
