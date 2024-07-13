const express = require("express");
const admin_route = express.Router();
const upload = require('../config/multer');


const userController = require("../controller/userController");
const bannerController = require("../controller/bannerController");
const productController = require("../controller/productsController");
const foodController = require("../controller/foodController");
const premiumController = require("../controller/premiumController");
const workoutController = require("../controller/workoutController");
const contentController = require("../controller/contentController");
const dashboardController = require("../controller/dashboardController");
const chatController = require("../controller/messageController");
const orderController = require("../controller/orderController");
const videocallController = require("../controller/videocallController");
const adminAuth = require("../Middilewares/adminAuth");




admin_route.post('/login',userController.admin_login)
admin_route.post('/get-admin-info-by-id',userController.admin_verify)

admin_route.post('/bannerlist',adminAuth,bannerController.fetchBanner);
admin_route.post('/deletebanner',adminAuth,bannerController.deleteBanner);
admin_route.post('/profiledetails',adminAuth,userController.adminProfileDetails);
admin_route.post('/uploadImage',adminAuth,upload.upload.single('image'),userController.uploadImages);
admin_route.post('/userlist',adminAuth,userController.list_user);
admin_route.post('/blockuser',adminAuth,userController.block_user);
admin_route.post('/unblockuser',adminAuth,userController.unblock_user);
admin_route.post('/blockproducts',adminAuth,productController.block_product);
admin_route.post('/unblockproducts',adminAuth,productController.unblock_product);
admin_route.post('/fetchproducts',adminAuth,productController.fetchProducts);
admin_route.post('/displayorders',adminAuth,orderController.displayOrders);
admin_route.post('/changestatus',adminAuth,orderController.changeStatus);
admin_route.post('/fetchfood',adminAuth,foodController.fetchfood);
admin_route.post('/deletefood',adminAuth,foodController.deletefood);
admin_route.post('/planlist',adminAuth,premiumController.fetchData);
admin_route.post('/deleteplan',adminAuth,premiumController.deletePlan);
admin_route.post('/contentlist',adminAuth,contentController.fetchData);
admin_route.post('/deletecontent',adminAuth,contentController.deleteContent);
admin_route.post('/videolist',adminAuth,workoutController.listVideos);
admin_route.post('/deletevideo',adminAuth,workoutController.deleteVideo);
admin_route.post('/addbanner',adminAuth, upload.upload.single('image'),bannerController.addBanner);
admin_route.post('/addproducts',adminAuth,upload.upload.single('image'),productController.addProducts);
admin_route.post('/fetchproduct',adminAuth,productController.fetchProduct);
admin_route.post('/editproducts',adminAuth,productController.editproducts);
admin_route.post('/editproductswithimage',adminAuth,upload.upload.single('image'),productController.editproductswithimage);
admin_route.post('/adminprofiledata',adminAuth,userController.addprofiledetails);
admin_route.post('/dashboarddetails',adminAuth,dashboardController.dashboardData);
admin_route.post('/dashboarddisplayorders',adminAuth,orderController.dashboarddisplayOrders);
admin_route.post('/adminprofileeditdata',adminAuth,userController.adminprofileeditdata);
admin_route.post('/fetchidfood',adminAuth,foodController.fetchidfood);
admin_route.post('/editfood',adminAuth,foodController.editfood);
admin_route.post('/addplans',adminAuth,premiumController.addPlan);
admin_route.post('/addvideos',adminAuth,workoutController.addVideos);
admin_route.post('/addcontent',adminAuth,upload.upload.single('image'),contentController.addContent);
admin_route.post('/addroomid',adminAuth,videocallController.addRoomId);
admin_route.post('/findroomid',adminAuth,videocallController.fetchRoomId);
admin_route.post('/deleteroom',adminAuth,videocallController.deleteRoom);
admin_route.post('/roomcheck',adminAuth,videocallController.validateRoomid);
admin_route.post('/savefood',adminAuth,foodController.addFood);
admin_route.post('/fetchsingleorder',adminAuth,orderController.fetchProductFromOrder);
admin_route.post('/primeusersdetails',adminAuth,premiumController.primiumCoustomers);
admin_route.post('/subscriptionadminsidesingledata',adminAuth,premiumController.collectData)
admin_route.post('/fetchdetails',userController.fetchdetails)
admin_route.post('/getprimeuserdata',userController.getPrimeUserDetails)
admin_route.post('/fetchsingledata',userController.fetchSingleData)



//check find pending
module.exports = admin_route;