const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const { userAuth, userCheck } = require("../middlewares/Auth");

//********************************************************CREATE-A-NEW-PRODUCT*************************************************** */
router.post("/product/newproduct", userAuth, userCheck, async (req, res) => {
  try {
    const product = await new Product(req.body);
    const createProduct = await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//*********************************************************GET-ALL-PRODUCTS-DETAILS***************************************************
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    const productCount = await Product.countDocuments();

    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//*********************************GET ALL PRODUCTS ADMIN*********** */
router.get("/adminproducts", userAuth, userCheck, async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//***********************************************************GET-A-SINGLE-PRODUCT-DETAIL**********************************************
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      console.log("no product found");
      res.status(404).send("Product not found");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//**********************************************************UPDATE-A-PRODUCT**************************************************** */
router.put("/product/:id", userAuth, userCheck, async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.send("No product found");
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//***********************************************************DELETE-A-PRODUCT****************************************************** */
router.delete("/deleteproduct/:id", userAuth, userCheck, async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.status(404).send("Product not found");
    }
    // console.log(req.params.id);
    const deletedProduct = await Product.findByIdAndDelete(req.params.id, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
    // console.log(deletedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

//******************************************************RATINGS-CREATE-OR-UPDATE************************************************ */

router.put("/productreview", userAuth, async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      userEmail: req.user.email,
      userName: req.user.name,
      rating,
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => {
      return rev.userEmail === req.user.email;
    });

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.userEmail === req.user.email) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);

      product.numofReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((review) => {
      avg += review.rating;
    });

    product.ratings = avg / product.numofReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).send("Reviews updated successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

//********************************************************DELETE-A-REVIEW********************************************************* */
router.delete("/reviews", userAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      res.status(404).send("No product found");
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() != req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((review) => {
      avg += review.rating;
    });

    let ratings = 0;
    if (reviews.length > 0) {
      ratings = avg / reviews.length;
    } else {
      ratings = 0;
    }

    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      { ratings, reviews, numofReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

/*************************************GET-ALL-REVIEWS OF A PR0DUCT***************************************** */
router.get("/reviews", userAuth, userCheck, async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    res.status(400).send(error);
  }
});
//****************************************************************************************************************************** */
module.exports = router;
