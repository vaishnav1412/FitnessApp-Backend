const express = require("express");
const user_route = express.Router();
const { Module } = require("module");
const User = require("../models/userModel");
const upload = require('../config/multer')
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");

const userController = require("../controller/userController");
const authMiddileware = require("../Middilewares/authMiddileware")
const addressController =require("../controller/addressController")
const bannerController =require("../controller/bannerController")
const productController =require("../controller/productsController")
const foodController = require("../controller/foodController")
const premiumController = require("../controller/premiumController")
const notificationController = require("../controller/notificationController")
const workoutController = require("../controller/workoutController")
const contentController = require("../controller/contentController")
const cartController = require("../controller/cartController")
const orderController = require("../controller/orderController")
const chatController = require("../controller/messageController")
const videocallController = require("../controller/videocallController")

user_route.post("/register",upload.upload.single('image'),userController.register);
user_route.post("/otp",userController.registerOtp);
user_route.post('/login',userController.login);
user_route.post('/googlelogin',userController.googleLogin);
user_route.post('/conformemail',userController.conformemail);
user_route.post('/forgototp',userController.forgototpmatch);
user_route.post('/resetpassword',userController.changePassword)

user_route.post('/get-user-info-by-id',authMiddileware,userController.verify);
user_route.post('/profiledetails',authMiddileware,userController.userDetails);
user_route.post('/fetchcartdetails',authMiddileware,cartController.fetchCartData);
user_route.post('/usersideorderdetails',authMiddileware,orderController.fetchSingleOrders);
user_route.post('/fetchsubscriptionhistory',authMiddileware,premiumController.fetchUserSubscribeHistory);
user_route.post('/fetchlose',authMiddileware,foodController.fetchlose);
user_route.post('/fetchgain',authMiddileware,foodController.fetchgain);
user_route.post('/uploadImage',authMiddileware,upload.upload.single('image'),userController.uploadImage);
user_route.post('/plannotification',authMiddileware,notificationController.takeStatus);
user_route.post('/addaddress',authMiddileware,addressController.addressadd);
user_route.post('/userprofileeditdata',authMiddileware,userController.editUserProfile);
user_route.post('/userprofileaddressedit',authMiddileware,addressController.editProfileAddress);
user_route.post('/videocallnotification',authMiddileware,notificationController.liveStatus);
user_route.post('/videolist',authMiddileware,workoutController.listVideos);
user_route.post('/primecheck',authMiddileware,premiumController.primecheck);
user_route.post('/bannerlist',authMiddileware,bannerController.fetchBanner);

user_route.post("/bannerlist2",bannerController.fetchBanner2)
user_route.post('/contentlist',authMiddileware,contentController.fetchData);
user_route.get('/contentlists',contentController.fetchData);
user_route.post('/userfetchproducts',authMiddileware,productController.userfetchproducts);
user_route.post('/userfetchproducts2',productController.userfetchproducts2);
user_route.post('/userfetchproducts3',authMiddileware,productController.userfetchproducts3);

user_route.post('/pricesort',authMiddileware,productController.priceSort);
user_route.post('/usercatogoryfetchproducts',authMiddileware,productController.fetchCatogoryProduct)
user_route.post('/addtocart',authMiddileware,cartController.addToCart);
user_route.post('/addtocarts',authMiddileware,cartController.addToCart);
user_route.post('/increment',authMiddileware,cartController.increment);
user_route.post('/decrement',authMiddileware,cartController.decrement);
user_route.post('/deletecartdata',authMiddileware,cartController.deleteCartProduct);
user_route.post('/fetchproduct',authMiddileware,productController.detailProduct);
user_route.post('/deleteaddress',authMiddileware,addressController.deleteAddress);
user_route.post('/productpurchase',authMiddileware,orderController.purchaseProduct);
user_route.post('/verifyproductpayment',authMiddileware,orderController.verifyProductPayment);
user_route.post('/addcheckoutaddress',authMiddileware,addressController.checkoutaddressadd);
user_route.post('/savebmi',authMiddileware,userController.savebmi)
user_route.post('/planlist',authMiddileware,premiumController.fetchData)
user_route.post('/purchase',authMiddileware,premiumController.purchase)
user_route.post('/verifypayment',authMiddileware,premiumController.verifypayment)
user_route.post('/usercheckoutaddressedit',authMiddileware,addressController.usercheckoutaddressedit)
user_route.post('/fetchsingleaddress',authMiddileware,addressController.fetchsingleaddress)
user_route.post('/getadmindata',userController.getAdminData)
user_route.post('/roomcheck',videocallController.validateRoomid)
user_route.post('/findroomid',videocallController.fetchRoomId)
user_route.post('/resendcode',userController.resendCode)
user_route.post('/publiccontactus',userController.publicContactUs)

module.exports = user_route;
