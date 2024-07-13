const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Address =require('../models/addressModel');
const Order = require("../models/orderModel")
require("dotenv").config();
const Razorpay = require("razorpay");
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };


var instance = new Razorpay({
  key_id: process.env.Key_Id,
  key_secret:  process.env.Key_Secret,
});


const purchaseProduct =async(req,res) =>{
  
try {

    const  id = sanitizeId(req.body.id)
    const  addressId = req.body.selectedAddress
    if(id){
        if(addressId!==''){

         const cartData = await Cart.findOne({userId:id})
        const products =cartData.products

         const addressData = await Address.findOne({ userId:id})
         const addressDataOnly = addressData.addresses
       const selectedAddress= addressDataOnly.filter((items)=>{
        return items._id ==addressId
       })

        const userData = await User.findOne({_id:id})
let total = 0;

for (const product of cartData.products) {
  total += product.price * product.count;
}
    
       const payment_price =total*100
       const payment_capture = 1;
       
       const orderOptions = {
         amount: payment_price,
         currency: "INR",
         receipt: "order_receipt_" + id,
         payment_capture,
       };
       
       instance.orders.create(orderOptions, async (err, order) => {
         if (err) {
           console.error("Error creating order:", err);
           return res.status(500).send({ message: "Order creation failed", success: false });
         } else {
          
               const purchase = new Order({
                deliveryAddress: selectedAddress.toString(),
                userId: id,
                userName:userData.name ,
                orderId:order.id,
                products: cartData.products.map((product) => ({
                    productId: product.productId,
                    name: product.name,
                    count: product.count,
                    productPrice: product.price,
                    image:product.image
                    
                  })), 
                totalAmount:total
               
               });
       
               const purchaseData = await purchase.save();
               if(purchaseData){
                res.status(200).send({message:'sucess',order:order, order_id: order.id, success: true });
               }else{
                res.status(500).send({ message: "Order creation failed", success: false });
               } 
         }
       });
        }else{
  res.status(200).send({ message: "please select an address", success: false });
        }

    }else{
        res.status(200).send({ message: "something went wrong", success: false });
    }

    
} catch (error) {
  console.error("An error occurred:", error);
  res.status(500).send({ message: "Internal server error", success: false });
}
}

const verifyProductPayment = async (req, res) => {
  try {
    console.log('djfgjgfkgrsh');
    const orderId = sanitizeId( req.body.orderId );
   
    const userId = req.body.id
    
    if (userId) {
      const order = await Order.findOne({  orderId: orderId });
      if (order) {
        const responce = await Order.findOneAndUpdate(
          {orderId : orderId},
          { $set: {status:'Placed'} }
        );
        
 const success= await Cart.findOneAndDelete({userId:userId})

          res
            .status(200)
            .send({ success: true });
      
      } else {
        res
          .status(400)
          .send({ message: "payment varification failed.", success: false });
      }
    } else {
      res
        .status(400)
        .send({ message: "payment varification failed", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const fetchSingleOrders = async(req,res) =>{
  try {
    const userId = sanitizeId(req.userId)
    if(userId){
      const order = await Order.find({userId:userId})
      if(!order){
        res
        .status(200)
        .send({ message: "no previous records present...", success: false });
      }else{

        res
        .status(200)
        .send({ success: true,data:order });
      }

    }else{
      res
      .status(400)
      .send({ message: "something went wrong.", success: false });
    }
    
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

const dashboarddisplayOrders = async(req,res) =>{
  try {
    const order = await Order.find({ status: { $in: ['Placed', 'Delivered'] } });
    
    if(order){
      res
      .status(200)
      .send({ success: true,data:order });
    }else{
      res
      .status(200)
      .send({ message: "something went wrong.", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

const displayOrders = async(req,res) =>{
  try {
    const order= await Order.find({})
    
    if(order){
      res
      .status(200)
      .send({ success: true,data:order });
    }else{
      res
      .status(200)
      .send({ message: "something went wrong.", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

const fetchProductFromOrder = async(req,res) =>{
  try {
    const id = sanitizeId(req.body.id)
   if(id){

    const order = await Order.find({_id:id})

    if(order){
      res
      .status(200)
      .send({ success: true,data:order });
    }else{
      res
    .status(200)
    .send({ message: "something went wrong.", success: false });
    }
    
   }else{
    res
    .status(200)
    .send({ message: "something went wrong.", success: false });
   }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

const changeStatus = async(req,res) =>{
  try {
    const id =sanitizeId( req.body.id)
    if(id){
      const order = await Order.find({_id:id})
      console.log(order);
      if(order){
        if(order[0].status=='Pending'){
          res
          .status(200)
          .send({ message: "user not complete this order", success: true });
        }else if(order[0].status =='Delivered'){
          res
          .status(200)
          .send({ message: "Order is delivered", success: true });
        }else{
        const response = await Order.findOneAndUpdate({_id:id} ,{$set:{status:'Delivered'}})
        console.log(response);
        if(response){
          res
          .status(200)
          .send({ message: "updated successfully", success: true });
        }else{
          res
          .status(200)
          .send({ message: "something went wrong.", success: false });
        }
        }
      }else{
        res
    .status(200)
    .send({ message: "something went wrong.", success: false });
      }

    }else{
       res
    .status(200)
    .send({ message: "something went wrong.", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

module.exports ={
    purchaseProduct,
    verifyProductPayment,
    fetchSingleOrders,
    displayOrders,
    fetchProductFromOrder,
    changeStatus,
    dashboarddisplayOrders

}