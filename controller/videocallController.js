const Room = require("../models/videocallRoomModel");
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };

const validateRoomid = async (req, res) => {
  try {
    const roomId = req.body.roomId
    if(roomId){
    const response = await Room.findOne({roomId:roomId})
    if(response){
      res
      .status(200)
      .send({ success: true });
    }else{
      res
            .status(200)
            .send({ message: "Invalid ID .Please try with a valid one", success: false });
    }
    }else{
      res
      .status(200)
      .send({ message: "something went wrong", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};


const addRoomId = async (req, res) => {
    try {
      const id = req.body.room;
      if (id) {
        await Room.deleteMany({});
        const room = new Room({
          roomId: id,
        });
  
        const response = await room.save();
  
        if (response) {
          res.status(200).send({
            message: "Room Id created successfully",
            success: true,
            data: id,
          });
        } else {
          res.status(500).send({ message: "Something went wrong.", success: false });
        }
      } else {
        res.status(400).send({ message: "Invalid room ID.", success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error.", success: false });
    }
  };
  const fetchRoomId = async(req,res) =>{
    try {
        const data= await Room.find({})
      

        if(data){
            res
            .status(200)
            .send({ message: "your room id is redy", success: true ,data:data[0].roomId});
        }else{
            res
            .status(200)
            .send({ message: "something went wrong", success: false });

        }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }
  }

  const deleteRoom = async(req,res) =>{
    try {
      const response =   await Room.deleteMany({});
      if(response) {
        res
        .status(200)
        .send({ message: "room deleted sucessfully", success: true });
      }else{
        res
        .status(200)
        .send({ message: "something went wrong", success: false });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }
   
  } 

module.exports = {
  validateRoomid,
  addRoomId,
  fetchRoomId,
  deleteRoom
};
