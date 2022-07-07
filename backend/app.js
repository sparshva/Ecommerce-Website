const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ECOMMERCE-WEBSITE")
  .then(() => {
    console.log("mongoose connection successfull");
  })
  .catch((error) => {
    console.log(error);
  });
