import express from "express";
import Image from "../models/imageModel.js";
import fs from 'fs'
const imageRoute = express.Router();

imageRoute.post('/upload',(req,res,err)=>{
    if(err){
        console.log(err);
    }
    else{
        const newImage = new Image({
            name:req.body.name,
          data:fs.readFileSync('uploads/' + req.file.filename),
          contentType:'image/png'
        })
        newImage.save().then(()=>res.send("successfully uploaded")).catch(err=>console.log(err))

       
    }
})
export default imageRoute