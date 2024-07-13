const Content =require('../models/contentModel')
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };

require("dotenv").config();
cloudinary.config({
    cloud_name: 'dcvjgllsv',
    api_key:'527128166483612',
    api_secret:process.env.Cloud_Api_Secret,
    secure: true,
  });

const addContent = async (req,res) =>{
    const title = req.body.title;
    const description = req.body.description
    const img= req.file.mimetype
   
    
    try {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif']; 
        if (!allowedTypes.includes(img)) {
        console.log('hai');
          res
          .status(200)
          .send({ message: "only accept jpeg,jpg,gif files", success: false });
        } else {
          const maxSizeBytes = 5 * 1024 * 1024;
          if (img.size > maxSizeBytes) {
            res
            .status(200)
            .send({ message: "only accept images upto 5 mb", success: false });
          } else {

        const data = await cloudinary.uploader.upload(
            "./uploads/" + req.file.filename
          );
          const cdurl = data.secure_url;
          if(cdurl){
            const content = new Content({
                title: title,
                image: cdurl,
                description:description
            })
            const contentData = await content.save()
            if(contentData){
            res.status(200).send({message: "Banner updated succesfully" , success: true })
            }else{
            res.status(200).send({message: "Banner updation failed" , success: false })
            }
          }else{
            res.status(200).send({message: "Banner updation failed" , success: false })
          }
        }} 
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }
}

const fetchData = async(req,res) =>{ 
    try {
        const content = await Content.find({})
        if(content){
          res.status(200).send({ success: true,data:content })
        }else{
          res.status(200).send({message: "fetching content failed" , success: true })
        }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }
}

const deleteContent = async(req,res) =>{
    try {
        const titles = req.body.title
        if(titles){
         const content =await Content.findOneAndDelete({_id:titles})
         res.status(200).send({message: "Delete content successfully", success: true })
        }else{
          res.status(200).send({message: "something went wrong", success: false })
        }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }
}

module.exports ={
    addContent,
    fetchData,
    deleteContent
}