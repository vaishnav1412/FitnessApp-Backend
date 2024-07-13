const jwt =require('jsonwebtoken')
const User = require("../models/userModel");


module.exports = async (req,res,next)=>{
   
 try {

    const token = req.headers["authorisation"].split(" ")[1] ;
    
    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
      if(err){
         return  res.status(401).send({ message: "authentification failed", success: false });
      }else{
           const role= decoded.role
           
        if(role==='user'){
  
         const user = await User.findOne({_id:decoded.id})
         if(!user){
            return  res.status(401).send({ message: "authentification failed", success: false });
         }else{
             if (user.isVarified===1) {
               req.userId = decoded.id
               next();
             } else {
               return  res.status(401).send({ message: "authentification failed", success: false });
             }
         }
        }else{
         return  res.status(401).send({ message: "authentification failed", success: false });
        }
        
      }
    })

 } catch (error) {
   console.log(error);
    return  res.status(401).send({ message: "authentification failed", success: false });
 }


}