const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter a valid product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a valid product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter a valid product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [100, "Stock cannot exceed 100"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userEmail: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

Product = new mongoose.model("Product", productSchema);
module.exports = Product;
