const Order = require("../models/orderModel")
const Prime = require("../models/subscriptionModel");
const User = require("../models/userModel");
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };


const dashboardData = async (req,res) =>{
   
    try {

        const user= await User.aggregate([{ $group: {_id: null,  totalUsers: { $sum: 1 }}}])
        const prime = await User.aggregate([ {$match: {isPrime: 1  } }, { $group: { _id: null,  totalPrimeMembers: { $sum: 1 }  } }])
        const normal = await User.aggregate([ {$match: {isPrime: 0  } }, { $group: { _id: null,  totalNormalMembers: { $sum: 1 }  } }])
        const order = await Order.aggregate([{ $match: { status: "Placed", }, }, { $group: { _id: null, count: { $sum: 1, },},},  ]);
        const primeTotal= await Prime.aggregate([{$group: { _id: null,totalAmount: { $sum: '$amount' } } } ])
        const orderEarning = await Order.aggregate([
            { $match: { status: { $in: ['Placed', 'Delivered'] } } },
            { $group: { _id: null, totalAmount: { $sum: '$totalAmount' } } },
          ]);
          
        
        const totalUser = user[0].totalUsers
        const totalPrimeUsers = prime[0].totalPrimeMembers
        const totalNormalUsers = normal[0].totalNormalMembers
        const orderTotal = order[0].count
        const primeEarning = primeTotal[0].totalAmount
        const orderEarnings = orderEarning[0].totalAmount
     
       if(totalUser&&totalPrimeUsers&&totalNormalUsers&&primeEarning){
       
        res
        .status(200)
        .send({ success: true, data1: totalUser,data2:totalPrimeUsers,data3:totalNormalUsers,data4:orderTotal,data5:orderEarnings,data6:primeEarning});
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
module.exports ={
    dashboardData
}