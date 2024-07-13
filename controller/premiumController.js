const Plan = require("../models/planModel");
const Prime = require("../models/subscriptionModel");
const Razorpay = require("razorpay");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");
require("dotenv").config();
const sanitizeId = (id) => {
  return id
 };

var instance = new Razorpay({
  key_id: process.env.Key_Id,
  key_secret: process.env.Key_Secret,
});

const addPlan = async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const duration = req.body.duration;
  const features = req.body.features;
  const featureList = features.split(",").map((feature) => feature.trim());
  try {
    const plan = new Plan({
      name: name,
      price: price,
      duration: duration,
      features: featureList,
    });

    const planData = await plan.save();

    if (planData) {
      res
        .status(200)
        .send({ message: "plan added succesfully", success: true });
    } else {
      res.status(200).send({ message: "plan updation failed", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const fetchData = async (req, res) => {
  try {
    const response = await Plan.find({});
    if (response) {
      res.status(200).send({ success: true, data: response });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const deletePlan = async (req, res) => {
  try {
    const id = sanitizeId(req.body.id);

    if (id) {
      const response = await Plan.findOneAndDelete({ _id: id });
      if (response) {
        res
          .status(200)
          .send({ message: "plan succesfully deleted", success: true });
      } else {
        res
          .status(200)
          .send({ message: "plan deletion failed", success: false });
      }
    } else {
      res.status(200).send({ message: "plan deletion failed", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const purchase = async (req, res) => {
  try {
    const id = sanitizeId(req.body.id);
    const planId = req.body.plan;
    const plan = await Plan.findOne({ _id: planId });
    const amounts = plan.price;
    if (id) {
      const duration = plan.duration;
      if (!plan) {
        return res
          .status(404)
          .send({ message: "Plan not found", success: false });
      }
      const payment_price = plan.price * 100;
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
          return res
            .status(500)
            .send({ message: "Order creation failed", success: false });
        } else {
          const subscribed = await Prime.findOne({ userId: id });
          if (!subscribed) {
            if (duration === "1") {
              const Subscription = new Prime({
                userId: id,
                planId: planId,
                startDate: new Date(),
                endDate: new Date(
                  new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                ),
                orderId: order.id,
                amount: amounts,
              });
              const SubscriptionData = await Subscription.save();
              await updateUserPurchaseHistory(id, order.id, amounts);
              res
                .status(200)
                .send({ order_id: order.id, order: order, success: true });
            } else if (duration === "3") {
              const Subscription = new Prime({
                userId: id,
                planId: planId,
                startDate: new Date(),
                endDate: new Date(
                  new Date().getTime() + 90 * 24 * 60 * 60 * 1000
                ),
                orderId: order.id,
                amount: amounts,
              });
              const SubscriptionData = await Subscription.save();
              await updateUserPurchaseHistory(id, order.id, amounts);
              res
                .status(200)
                .send({ order_id: order.id, order: order, success: true });
            } else if (duration === "6") {
              const Subscription = new Prime({
                userId: id,
                planId: planId,
                startDate: new Date(),
                endDate: new Date(
                  new Date().getTime() + 180 * 24 * 60 * 60 * 1000
                ),
                orderId: order.id,
                amount: amounts,
              });
              const SubscriptionData = await Subscription.save();
              await updateUserPurchaseHistory(id, order.id, amounts);
              res
                .status(200)
                .send({ order_id: order.id, order: order, success: true });
            } else {
              const Subscription = new Prime({
                userId: id,
                planId: planId,
                startDate: new Date(),
                endDate: new Date(
                  new Date().getTime() + 360 * 24 * 60 * 60 * 1000
                ),
                orderId: order.id,
                amount: amounts,
              });
              const SubscriptionData = await Subscription.save();
              await updateUserPurchaseHistory(id, order.id, amounts);
              res
                .status(200)
                .send({ order_id: order.id, order: order, success: true });
            }
          } else {
            const user = await User.findOne({ _id: id });
            if (user) {
              if (user.isPrime == 0) {
                console.log("its fine");

                if (duration === "1") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);

                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else if (duration === "3") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() + 90 * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else if (duration === "6") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() + 180 * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() + 360 * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                }
              } else {
                ///thired case

                const endDate = subscribed.endDate;
                const startDate = subscribed.startDate;
                const timeDifference = endDate - startDate;
                const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                if (duration === "1") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() +
                            30 * 24 * 60 * 60 * 1000 +
                            daysDifference * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else if (duration === "3") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() +
                            90 * 24 * 60 * 60 * 1000 +
                            daysDifference * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else if (duration === "6") {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() +
                            180 * 24 * 60 * 60 * 1000 +
                            daysDifference * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                } else {
                  const update = await Prime.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        userId: id,
                        planId: planId,
                        startDate: new Date(),
                        endDate: new Date(
                          new Date().getTime() +
                            360 * 24 * 60 * 60 * 1000 +
                            daysDifference * 24 * 60 * 60 * 1000
                        ),
                        orderId: order.id,
                        amount: amounts,
                      },
                    }
                  );
                  await updateUserPurchaseHistory(id, order.id, amounts);
                  res
                    .status(200)
                    .send({ order_id: order.id, order: order, success: true });
                }

                ///thired case
              }
            } else {
              res.status(200).send({
                message: "something went wrong",
                success: false,
              });
            }
          }
        }
      });
    } else {
      res.status(400).send({ message: "Invalid input data", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const updateUserPurchaseHistory = async (userId, orderId, amount) => {
  try {
    const purchaseRecord = {
      purchaseDate: new Date(),
      amount: amount,
      orderId: orderId,
    };

    await Prime.updateOne(
      { userId: userId },
      { $push: { purchaseHistory: purchaseRecord } }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const verifypayment = async (req, res) => {
  try {
    const userId = sanitizeId(req.body.id);
    if (userId) {
      const user = await User.findOne({ _id: userId });
      if (user) {
        const responce = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { isPrime: 1 } }
        );
        if (responce) {
          res
            .status(200)
            .send({ message: "You Are Now A Premium User", success: true });
        } else {
          res
            .status(400)
            .send({ message: "payment varification failed..", success: false });
        }
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

const primecheck = async (req, res) => {
  try {
    const id = sanitizeId(req.body.id);
    if (id) {
      const plan = await Prime.findOne({ userId: id });
      if (plan) {
        const currentDate = new Date();
        const endDate = plan.endDate;
        const user = await User.findOne({ _id: id });
        if (user.isPrime === 1) {
          if (endDate < currentDate) {
            const output = await User.findOneAndUpdate(
              { _id: id },
              { $set: { isPrime: 0 } }
            );
            res
              .status(200)
              .send({ message: "Please upgrade your account", success: false });
          } else {
            res.status(200).send({ success: true });
          }
        } else {
          res
            .status(200)
            .send({ message:"Please upgrade your account", success: false });
        }
      } else {
        res
          .status(200)
          .send({ message: "Please upgrade your account", success: false });
      }
    } else {
      res.status(200).send({ message: "Something went wrong", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const fetchUserSubscribeHistory = async (req, res) => {
  try {
    const userId =  sanitizeId( req.userId);
    if (userId) {
      const plans = await Prime.find({ userId: userId });
      const user = await User.findOne({ _id: userId });
      if (plans) {
        res.status(200).send({ success: true, data: plans[0].purchaseHistory });
      } else {
        res
          .status(200)
          .send({ message: "You Are Not A Premium User", success: false });
      }
    } else {
      res
        .status(200)
        .send({ message: "You Are Not A Premium User", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const primiumCoustomers = async (req, res) => {
  try {
    const details = await Prime.find({}).populate("userId").populate("planId");
    if (details) {
      res.status(200).send({ success: true, data: details });
    } else {
      res
        .status(200)
        .send({
          message: "no membership purchase are present",
          success: false,
        });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const collectData = async (req, res) => {
  try {
    const id = sanitizeIdb(req.body.id);

    const data = await Prime.findOne({ _id: id })
      .populate("userId")
      .populate("planId");

    if (data) {
      res.status(200).send({ success: true, data: data.purchaseHistory });
    } else {
      res
        .status(200)
        .send({
          message: "no membership purchase are present",
          success: false,
        });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  addPlan,
  fetchData,
  deletePlan,
  purchase,
  verifypayment,
  primecheck,
  fetchUserSubscribeHistory,
  primiumCoustomers,
  collectData,
};
