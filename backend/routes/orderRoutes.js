const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const { userAuth, userCheck } = require("../middlewares/Auth");
const Order = require("../models/orderModel");

//*****************************************************CREATE-A-NEW-ORDER*********************************************************** */
router.post("/orders/neworder", userAuth, async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await new Order({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });
    const createorder = await order.save();
    res.status(201).json({
      success: true,
      createorder,
    });
  } catch (error) {
    console.log(error);
  }
});

//****************************************************GET-DETAILS-OF-AN-ORDER****************************************************** */
router.get("/orders/:id", userAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      console.log("No order found");
    }

    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

//**********************************************GET-ORDER-DETAILS-OF-A-LOGGED-IN-USER*********************************************** */
router.get("/orders/myorders", userAuth, async (req, res) => {
  try {
    const myorder = await Order.find({ user: req.user._id });

    if (!myorder) {
      res.send("No order found");
    }

    res.send(myorder);
  } catch (error) {
    res.send(error);
  }
});

//*********************************************************GET-ALL-ORDERS************************************************************* */
router.get("/admin/orders", userAuth, userCheck, async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      orders,
      totalAmount,
    });
  } catch (error) {
    res.send(error);
  }
});

//*********************************************************UPDATE-ORDER-STATUS******************************************************** */
router.post("/admin/order/:id", userAuth, userCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.send("No order found");
    }

    if (order.orderStatus === "Delivered") {
      res.send("Product has already been delivered");
    }

    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.Product, ord.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.send("status updated successfully");
  } catch (error) {
    res.send(error);
  }
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//*****************************************************DELETE-AN-ORDER******************************************************** */
router.delete("/admin/order/:id", userAuth, userCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.send("No order found");
    }
    res.status(200).json({
      order,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
