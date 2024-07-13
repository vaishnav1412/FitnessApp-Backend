const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Address =require('../models/addressModel')
const mongoose = require('mongoose');
const sanitizeId = (id) => {
  return id
 };


const addToCart = async (req, res) => {
  console.log('iam here');
  try {
    const productId = sanitizeId( req.body.productId);
    const id =sanitizeId( req.body.id);
    const user = await User.findOne({ _id: id });
    const product = await Product.findOne({ _id: productId });
    if (user && product) {
      const cartData = await Cart.findOne({ userId: id });
      if (cartData) {
        const productExist = await cartData.products.findIndex(
          (products) => products.productId == productId
        );
        if (productExist != -1) {
          await Cart.updateOne(
            { userId: id, "products.productId": productId },
            { $inc: { "products.$.count": 1 } }
          );
          res
            .status(200)
            .send({
              message: "product sucessfully added to cart",
              success: true,
            });
        } else {
          await Cart.findOneAndUpdate(
            { userId: id },
            {
              $push: {
                products: {
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  stock: product.stock,
                  description: product.description,
                  catogory: product.catogory,
                  image: product.image,
                },
              },
            }
          );
          res
            .status(200)
            .send({
              message: "product sucessfully added to cart",
              success: true,
            });
        }
      } else {
        const cart = new Cart({
          userId: user._id,
          user: user.name,
          products: [
            {
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              stock: product.stock,
              description: product.description,
              catogory: product.catogory,
              image: product.image,
            },
          ],
        });
        const cartData = await cart.save();
        if (cartData) {
          res
            .status(200)
            .send({
              message: "product sucessfully added to cart",
              success: true,
            });
        } else {
          res
            .status(200)
            .send({ message: "product added to cart failed", success: false });
        }
      }
    } else {
      res
        .status(200)
        .send({ message: "product added to cart failed", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const fetchCartData = async (req, res) => {
  const id = req.userId;
console.log(id,"chech");
  try {
    if (id) {
      const data = await Cart.findOne({userId:id});
      const address = await Address.findOne({userId:id})
   console.log(address);
      if (data) {
        let totalPrice = 0;
        data.products.forEach((product) => {
          totalPrice += product.price * product.count;
        });

        res
          .status(200)
          .send({
            message: "successfully fetch cart data.",
            success: true,
            data: data,
            total:totalPrice,
            address:address?.addresses
          });
      } else {
        res
          .status(200)
          .send({ message: "fetching cart details failed.", success: false });
      }
    } else {
      res
        .status(200)
        .send({ message: "fetching cart details failed..", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const increment = async (req, res) => {
  try {
    const id =sanitizeId( req.body.id)
    const userId =  sanitizeId(req.body.userId)

    if (id && userId) {
      const cartData = await Cart.updateOne(
        { userId: userId, "products.productId": id },
        { $inc: { "products.$.count": -1 } }
      );

      const cartProductDatacount = await Cart.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.productId": id,
          },
        },
        {
          $project: {
            _id: 0,
            productCount: "$products.count",
          },
        },
      ]);
      const count = cartProductDatacount[0].productCount;

if(count <=0){

    const result = await Cart.updateOne(
        { userId: userId },
        { $pull: { products: { productId: id} } }
      );

res.status(200).send({ success: true });
}else{
    if (cartData) {
        res.status(200).send({ success: true });
      } else {
        res
          .status(200)
          .send({ message: "something went wrong", success: false });
      }
}

     
    } else {
      res.status(200).send({ message: "something went wrong", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};


const decrement = async (req, res) => {
  try {
    const id =  sanitizeId(req.body.id)
    const userId =  sanitizeId(req.body.userId)
    if (id && userId) {
      const productData = await Product.findOne({ _id: id });
      const productstock = productData.stock;
      const cartProductDatacount = await Cart.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.productId": id,
          },
        },
        {
          $project: {
            _id: 0,
            productCount: "$products.count",
          },
        },
      ]);
      const count = cartProductDatacount[0].productCount;
      if (productstock - count <= 0) {
        res.status(200).send({ message: "out of stock", success: false });
      } else {
        const cartData = await Cart.updateOne(
          { userId: userId, "products.productId": id },
          { $inc: { "products.$.count": 1 } }
        );
        if (cartData) {
          res.status(200).send({ success: true });
        } else {
          res
            .status(200)
            .send({ message: "something went wrong", success: false });
        }
      }
    } else {
      res.status(200).send({ message: "something went wrong", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};


const deleteCartProduct = async(req,res) =>{
    try {
        const productId = sanitizeId(req.body.productId)
        const userId = sanitizeId(req.body.userId)
       if(productId){
        const result = await Cart.updateOne(
            { userId: userId },
            { $pull: { products: { productId: productId} } }
          );
          if(result){
            res.status(200).send({ success: true });
          }else{
            res
            .status(200)
            .send({ message: "something went wrong...", success: false });
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

module.exports = {
  addToCart,
  fetchCartData,
  increment,
  decrement,
  deleteCartProduct
};
