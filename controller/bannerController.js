const Banner = require("../models/bannerModel") 
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };



const addBanner =async(req,res)=>{
    
    try {
        const title = req.body.title;
        const image = req.file.filename;
        
        const img= req.file.mimetype
        
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif']; 
        if (!allowedTypes.includes(img)) {
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


        const banner = new Banner({
            title: title,
            image: image
        })
        const bannerData = await banner.save()
        if(bannerData){
        res.status(200).send({message: "Banner updated succesfully" , success: true })
        }else{
            res.status(200).send({message: "Banner updation failed" , success: false })
        }

      }
    }
      } catch (error) {
        res.status(500).send({
          message: "Error updating profile picture",
          success: false,
          error,
        });
      }

}

const fetchBanner = async(req,res) =>{
 try {
  const banner = await Banner.find({})
  if(banner){
    res.status(200).send({ success: true,data:banner })
  }else{
    res.status(200).send({message: "fetching banner failed" , success: true })
  }
 } catch (error) {
  console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
 }
}

const fetchBanner2 = async(req,res)=>{

  try {
    const banner = await Banner.find({})
    if(banner){
      res.status(200).send({ success: true,data:banner })
    }else{
      res.status(200).send({message: "fetching banner failed" , success: true })
    }
   } catch (error) {
    console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
   }
}

const deleteBanner =async (req,res) =>{
  try {
    const titles = req.body.title
  if(titles){
   const banner =await Banner.findOneAndDelete({_id:titles})
   res.status(200).send({message: "Delete banner successfully", success: true })
  }else{
    res.status(200).send({message: "something went wrong", success: false })
  }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

module.exports ={
                 addBanner,
                 fetchBanner,
                 deleteBanner,
                 fetchBanner2
                }