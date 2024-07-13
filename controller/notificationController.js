const { response } = require("express");
const Prime = require("../models/subscriptionModel");
const User = require("../models/userModel");
const Room = require("../models/videocallRoomModel");
const mongoose = require('mongoose');
const sanitizeId = (id) => {
    return id
   };



const takeStatus = async(req,res) =>{
    try {
        const id =  sanitizeId(req.body.id)
        if(id){
            const user = await User.findOne({_id:id})
            if(user.isPrime===1){
                const membership = await Prime.findOne({userId:id})
                if(membership){
                    const currentDate = new Date();
                    const endDate = new Date(membership.endDate);
                    const timeDifference = endDate.getTime() - currentDate.getTime();
                    const daysDifference = Math.trunc(timeDifference / (1000 * 60 * 60 * 24));
                    if(daysDifference<=0){
                        res.status(200).send({ success: false});
                    }
                    else if(daysDifference<6){
                        res.status(200).send({ message: `Your Plan Expires soon...only ${daysDifference} days left.`, success: true,data:membership});
                    }
                    else{
                        res.status(200).send({ success: true,data:membership });
                    }
                }else{
                    res.status(200).send({ success: false });
                }
            }else{
                res.status(200).send({  success: false });
            }
        }else{
            res.status(200).send({ success: false });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ message: "Internal server error", success: false });
    }
}

const liveStatus = async(req,res) =>{
    try {

        const roomCount = await Room.countDocuments();
        console.log(response);
        const user = await User.findOne({isAdmin:1})
       
        if(roomCount>0){
            res.status(200).send({ message:"Coatch is live now..." , success: true,data:user});
        
        }else{
            res.status(200).send({  success: false });
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
    }
}


module.exports = {
    takeStatus,
    liveStatus
}